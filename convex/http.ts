import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "@cvx/_generated/server";
import { internal, components } from "@cvx/_generated/api";
import { registerRoutes } from "@convex-dev/stripe";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

http.route({
  path: "/vapi-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { message } = body;

      console.log("Vapi webhook:", message.type);

      switch (message.type) {
        case "transcript": {
          // Only process final transcripts to avoid duplicates/spam
          if (message.transcriptType !== "final") {
            return new Response(null, { status: 200 });
          }

          // Try to get debateId from metadata or query params
          let debateId = message.call?.metadata?.debateId;
          if (!debateId) {
            const url = new URL(request.url);
            debateId = url.searchParams.get("debateId");
          }

          if (!debateId) {
            console.warn(
              "[transcript] No debateId in metadata or query params. Metadata:",
              JSON.stringify(message.call?.metadata),
            );
            return new Response(null, { status: 200 });
          }

          const transcriptText = message.transcript || "";
          const speaker = message.role === "user" ? "user" : "assistant";

          console.log(
            `[transcript] Storing: ${speaker} - "${transcriptText.substring(0, 50)}..."`,
          );

          // Store transcript (no real-time analysis - full analysis happens at end of debate)
          try {
            await ctx.runMutation(internal.debates.addTranscript, {
              debateId: debateId as any,
              speaker: speaker,
              text: transcriptText,
              timestamp: Date.now(),
            });
            console.log(
              `[transcript] Successfully stored exchange for debate ${debateId}`,
            );
          } catch (error) {
            console.error(`[transcript] Error storing transcript:`, error);
          }

          break;
        }

        case "end-of-call-report": {
          // Try to get debateId from metadata or query params
          let debateId = message.call?.metadata?.debateId;
          if (!debateId) {
            const url = new URL(request.url);
            debateId = url.searchParams.get("debateId");
          }

          if (!debateId) {
            console.warn(
              "[end-of-call-report] No debateId in metadata or query params",
            );
            return new Response(null, { status: 200 });
          }

          // Mark debate as complete
          await ctx.runMutation(internal.debates.complete, {
            debateId: debateId as any,
            duration: message.call?.duration || 0,
          });

          // Consume token for this debate (monetization system)
          try {
            const debate = await ctx.runQuery(internal.debates.getInternal, {
              debateId: debateId as any,
            });

            if (debate && debate.opponentId) {
              const opponent = await ctx.runQuery(
                internal.opponents.getInternal,
                {
                  opponentId: debate.opponentId,
                },
              );

              if (opponent?.scenarioType) {
                const result = await ctx.runMutation(
                  internal.tokens.INTERNAL_consumeToken,
                  {
                    userId: debate.userId,
                    scenarioId: opponent.scenarioType,
                    debateId: debateId as any,
                  },
                );
                console.log(
                  `[end-of-call-report] Token consumed for scenario ${opponent.scenarioType}:`,
                  result,
                );
              }
            }
          } catch (tokenError) {
            // Log but don't fail the webhook - debate is already marked complete
            console.error(
              "[end-of-call-report] Token consumption error:",
              tokenError,
            );
          }

          // Extract recording URL from Vapi artifact
          // Recording is at message.artifact.recording (mono.combinedUrl for mono recordings)
          const artifact = message.artifact;
          const recordingUrl =
            artifact?.recording?.mono?.combinedUrl ||
            artifact?.recording?.stereoUrl;

          if (recordingUrl) {
            await ctx.scheduler.runAfter(0, internal.r2.storeRecording, {
              debateId: debateId as any,
              recordingUrl,
            });
          }

          // Trigger full analysis generation (non-blocking)
          await ctx.scheduler.runAfter(
            1000,
            internal.actions.analysisAction.generateFullAnalysis,
            {
              debateId: debateId as any,
            },
          );

          break;
        }

        default:
          console.log(`Unhandled Vapi webhook type: ${message.type}`);
      }

      return new Response(null, { status: 200 });
    } catch (error) {
      console.error("Vapi webhook error:", error);
      return new Response(null, { status: 200 });
    }
  }),
});

// Register Stripe webhook routes
registerRoutes(http, components.stripe, {
  webhookPath: "/stripe/webhook",
  events: {
    "checkout.session.completed": async (ctx, event) => {
      const session = event.data.object;
      const customerId = session.customer as string;
      const metadata = session.metadata || {};
      const subscriptionId = session.subscription as string | undefined;
      const paymentIntentId = session.payment_intent as string | undefined;

      const userId = metadata.userId as Id<"users">;

      // Update user with Stripe customer ID if not already set
      await ctx.runMutation(
        internal.stripeWebhooks.INTERNAL_updateUserStripeCustomer,
        {
          userId,
          stripeCustomerId: customerId,
        },
      );

      if (metadata.type === "token_purchase") {
        // Token purchase - grant tokens to scenario
        const scenarioId = metadata.scenarioId;
        const tokens = parseInt(metadata.packTokens);

        await ctx.scheduler.runAfter(0, internal.tokens.INTERNAL_grantTokens, {
          userId,
          scenarioId,
          amount: tokens,
          reason: "purchase",
          metadata: {
            stripePaymentId: paymentIntentId || "",
          },
        });

        console.log(
          `[Stripe] Granted ${tokens} tokens to user ${userId} for scenario ${scenarioId}`,
        );
      } else if (metadata.type === "subscription") {
        // Subscription - create or update subscription record
        if (!subscriptionId) {
          console.error(
            "[Stripe] No subscription ID provided for subscription checkout",
          );
          return;
        }

        await ctx.scheduler.runAfter(
          0,
          internal.stripeWebhooks.handleSubscriptionCreated,
          {
            userId,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
          },
        );

        console.log(
          `[Stripe] Created ${metadata.plan} subscription for user ${userId}`,
        );
      }
    },
    "customer.subscription.updated": async (ctx, event) => {
      const subscription = event.data.object;
      const stripeSubscriptionId = subscription.id;
      const status = subscription.status;
      const currentPeriodStart = subscription.current_period_start * 1000; // Convert to ms
      const currentPeriodEnd = subscription.current_period_end * 1000; // Convert to ms
      const cancelAtPeriodEnd = subscription.cancel_at_period_end;

      await ctx.runMutation(
        internal.stripeWebhooks.INTERNAL_updateSubscription,
        {
          stripeSubscriptionId,
          status,
          currentPeriodStart,
          currentPeriodEnd,
          cancelAtPeriodEnd,
        },
      );

      console.log(
        `[Stripe] Updated subscription ${stripeSubscriptionId} to status: ${status}`,
      );
    },
    "customer.subscription.deleted": async (ctx, event) => {
      const subscription = event.data.object;
      const stripeSubscriptionId = subscription.id;

      await ctx.runMutation(
        internal.stripeWebhooks.INTERNAL_cancelSubscription,
        {
          stripeSubscriptionId,
        },
      );

      console.log(`[Stripe] Canceled subscription ${stripeSubscriptionId}`);
    },
  },
});

auth.addHttpRoutes(http);

export default http;

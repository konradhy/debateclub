import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "@cvx/_generated/server";
import { internal, components } from "@cvx/_generated/api";
import { registerRoutes } from "@convex-dev/stripe";
import { Id } from "./_generated/dataModel";
import { calculateVapiCost } from "./lib/costCalculator";

const http = httpRouter();

http.route({
  path: "/vapi-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { message } = body;

      switch (message.type) {
        case "transcript": {
          if (message.transcriptType !== "final") {
            return new Response(null, { status: 200 });
          }

          let debateId = message.call?.metadata?.debateId;
          if (!debateId) {
            const url = new URL(request.url);
            debateId = url.searchParams.get("debateId");
          }

          if (!debateId) {
            return new Response(null, { status: 200 });
          }

          const transcriptText = message.transcript || "";
          const speaker = message.role === "user" ? "user" : "assistant";

          try {
            await ctx.runMutation(internal.debates.addTranscript, {
              debateId: debateId as any,
              speaker: speaker,
              text: transcriptText,
              timestamp: Date.now(),
            });
          } catch (error) {
            console.error(`[transcript] Error storing transcript:`, error);
          }

          break;
        }

        case "end-of-call-report": {
          let debateId = message.call?.metadata?.debateId;
          if (!debateId) {
            const url = new URL(request.url);
            debateId = url.searchParams.get("debateId");
          }

          if (!debateId) {
            console.log("[webhook] No debateId found in end-of-call-report");
            return new Response(null, { status: 200 });
          }

          // Get the debate to check if duration was already set by client
          const debate = await ctx.runQuery(internal.debates.getInternal, {
            debateId: debateId as any,
          });

          let callDuration = 0;

          if (debate?.duration) {
            // Use client-provided duration (from timer) as source of truth
            callDuration = debate.duration;
            console.log(`[webhook] Using client timer duration: ${callDuration}s`);
          } else {
            // Fallback to Vapi API duration if client didn't provide it
            callDuration = message.call?.duration || 0;

            // Fallback: calculate from timestamps
            if (callDuration === 0 && message.call?.startedAt && message.call?.endedAt) {
              const startTime = new Date(message.call.startedAt).getTime();
              const endTime = new Date(message.call.endedAt).getTime();
              callDuration = Math.round((endTime - startTime) / 1000);
              console.log(`[webhook] Calculated duration from timestamps: ${callDuration}s`);
            }

            // Final fallback: estimate 60 seconds (with warning)
            if (callDuration === 0) {
              callDuration = 60;
              console.warn(`[webhook] Using 60s fallback estimate for debate ${debateId} - this violates accurate tracking`);
            }

            // Complete the debate if not already completed
            await ctx.runMutation(internal.debates.complete, {
              debateId: debateId as any,
              duration: callDuration,
            });
          }

          // Record Vapi cost using the determined duration
          try {
            if (debate) {
              const costInCents = calculateVapiCost(callDuration);
              console.log(`[webhook] Recording Vapi cost: ${costInCents} cents for ${callDuration}s (debate phase)`);
              await ctx.runMutation(internal.costs.INTERNAL_recordApiCost, {
                service: "vapi",
                cost: costInCents,
                debateId: debateId as any,
                userId: debate.userId,
                phase: "debate",
                details: {
                  duration: callDuration,
                },
              });
            }
          } catch (costError) {
            console.error(`[webhook] Error recording Vapi cost for debate ${debateId}:`, costError);
          }

          // Consume token
          try {
            if (debate && debate.opponentId) {
              const opponent = await ctx.runQuery(
                internal.opponents.getInternal,
                { opponentId: debate.opponentId },
              );

              if (opponent?.scenarioType) {
                await ctx.runMutation(
                  internal.tokens.INTERNAL_consumeToken,
                  {
                    userId: debate.userId,
                    scenarioId: opponent.scenarioType,
                    debateId: debateId as any,
                  },
                );
              }
            }
          } catch (tokenError) {
            console.error(`[webhook] Error consuming token for debate ${debateId}:`, tokenError);
          }

          // Extract recording URL
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

          // Trigger analysis
          await ctx.scheduler.runAfter(
            1000,
            internal.actions.analysisAction.generateFullAnalysis,
            { debateId: debateId as any },
          );

          break;
        }
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

      await ctx.runMutation(
        internal.stripeWebhooks.INTERNAL_updateUserStripeCustomer,
        { userId, stripeCustomerId: customerId },
      );

      if (metadata.type === "token_purchase") {
        const scenarioId = metadata.scenarioId;
        const tokens = parseInt(metadata.packTokens);

        await ctx.scheduler.runAfter(0, internal.tokens.INTERNAL_grantTokens, {
          userId,
          scenarioId,
          amount: tokens,
          reason: "purchase",
          metadata: { stripePaymentId: paymentIntentId || "" },
        });
      } else if (metadata.type === "subscription") {
        if (!subscriptionId) return;

        await ctx.scheduler.runAfter(
          0,
          internal.stripeWebhooks.handleSubscriptionCreated,
          {
            userId,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
          },
        );
      }
    },
    "customer.subscription.updated": async (ctx, event) => {
      const subscription = event.data.object;
      await ctx.runMutation(
        internal.stripeWebhooks.INTERNAL_updateSubscription,
        {
          stripeSubscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodStart: subscription.current_period_start * 1000,
          currentPeriodEnd: subscription.current_period_end * 1000,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
      );
    },
    "customer.subscription.deleted": async (ctx, event) => {
      const subscription = event.data.object;
      await ctx.runMutation(
        internal.stripeWebhooks.INTERNAL_cancelSubscription,
        { stripeSubscriptionId: subscription.id },
      );
    },
  },
});

auth.addHttpRoutes(http);

export default http;

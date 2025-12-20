import { R2 } from "@convex-dev/r2";
import { components } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const r2 = new R2(components.r2);

/**
 * Stores a recording from Vapi URL into R2 and updates the debate record.
 */
export const storeRecording = internalAction({
  args: {
    debateId: v.id("debates"),
    recordingUrl: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Fetch the recording from Vapi URL
      const response = await fetch(args.recordingUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch recording: ${response.statusText}`);
      }

      const blob = await response.blob();

      // Store in R2 with a custom key based on debate ID
      const key = `debates/${args.debateId}/${Date.now()}.mp3`;
      const storedKey = await r2.store(ctx, blob, {
        key,
        type: "audio/mpeg",
      });

      // Update debate with recording key
      await ctx.runMutation(internal.debates.updateRecordingKey, {
        debateId: args.debateId,
        recordingKey: storedKey,
      });

      return storedKey;
    } catch (error) {
      console.error("Error storing recording:", error);
      throw error;
    }
  },
});


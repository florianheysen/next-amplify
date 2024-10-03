import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const saveImage = mutation({
  args: { taskId: v.id("tasks"), url: v.string() },
  handler: async (ctx, { taskId, url }) => {
    await ctx.db.patch(taskId, { fileUrl: url });
  },
});

//TODO: Change this mutation to an action that delete the file in S3
export const unlinkImage = mutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, { taskId }) => {
    await ctx.db.patch(taskId, { fileUrl: undefined });
  },
});

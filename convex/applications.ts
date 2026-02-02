import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserApplication = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const applications = await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    return applications[0] ?? null;
  },
});

export const submit = mutation({
  args: {
    companyName: v.string(),
    tagline: v.string(),
    description: v.string(),
    founderName: v.string(),
    founderEmail: v.string(),
    website: v.optional(v.string()),
    agentType: v.string(),
    stage: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if user already has an application
    const existing = await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      throw new Error("You have already submitted an application");
    }

    return await ctx.db.insert("applications", {
      ...args,
      userId,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("applications").collect();
    return {
      total: all.length,
      pending: all.filter((a) => a.status === "pending").length,
      accepted: all.filter((a) => a.status === "accepted").length,
    };
  },
});

import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  applications: defineTable({
    userId: v.id("users"),
    companyName: v.string(),
    tagline: v.string(),
    description: v.string(),
    founderName: v.string(),
    founderEmail: v.string(),
    website: v.optional(v.string()),
    agentType: v.string(),
    stage: v.string(),
    status: v.union(v.literal("pending"), v.literal("accepted"), v.literal("rejected")),
    createdAt: v.number(),
  }).index("by_user", ["userId"]).index("by_status", ["status"]),
});

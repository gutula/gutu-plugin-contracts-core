import { defineAction } from "@platform/schema";
import { z } from "zod";

import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord
} from "../services/main.service";
import {
  advancePrimaryRecordInputSchema,
  createPrimaryRecordInputSchema,
  reconcilePrimaryRecordInputSchema,
  approvalStateSchema,
  fulfillmentStateSchema,
  postingStateSchema,
  recordStateSchema
} from "../model";

export const createPrimaryRecordAction = defineAction({
  id: "contracts.registry.create",
  description: "Create Contract",
  input: createPrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    recordState: recordStateSchema,
    approvalState: approvalStateSchema,
    postingState: postingStateSchema,
    fulfillmentState: fulfillmentStateSchema,
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "contracts.registry.write",
  idempotent: true,
  audit: true,
  handler: ({ input }) => createPrimaryRecord(input)
});

export const advancePrimaryRecordAction = defineAction({
  id: "contracts.entitlements.activate",
  description: "Activate Entitlement",
  input: advancePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    recordState: recordStateSchema,
    approvalState: approvalStateSchema,
    postingState: postingStateSchema,
    fulfillmentState: fulfillmentStateSchema,
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "contracts.entitlements.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => advancePrimaryRecord(input)
});

export const reconcilePrimaryRecordAction = defineAction({
  id: "contracts.billing-schedules.publish",
  description: "Publish Billing Schedule",
  input: reconcilePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    exceptionId: z.string(),
    status: z.enum(["open", "under-review", "resolved", "closed"]),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "contracts.billing-schedules.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => reconcilePrimaryRecord(input)
});

export const businessActions = [
  createPrimaryRecordAction,
  advancePrimaryRecordAction,
  reconcilePrimaryRecordAction
] as const;

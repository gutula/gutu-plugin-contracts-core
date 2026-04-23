import { defineResource } from "@platform/schema";

import {
  primaryRecordsTable,
  secondaryRecordsTable,
  exceptionRecordsTable
} from "../../db/schema";
import { exceptionRecordSchema, primaryRecordSchema, secondaryRecordSchema } from "../model";

export const BusinessPrimaryResource = defineResource({
  id: "contracts.registry",
  description: "Contract headers, commercial terms, and amendment-safe lifecycle records.",
  businessPurpose: "Own agreement truth without burying long-running commitments inside orders or tickets.",
  table: primaryRecordsTable,
  contract: primaryRecordSchema,
  fields: {
    title: { searchable: true, sortable: true, label: "Title" },
    recordState: { filter: "select", label: "Record State" },
    approvalState: { filter: "select", label: "Approval" },
    postingState: { filter: "select", label: "Posting" },
    fulfillmentState: { filter: "select", label: "Fulfillment" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["title", "recordState", "approvalState", "postingState", "fulfillmentState", "updatedAt"]
  },
  portal: { enabled: false }
});

export const BusinessSecondaryResource = defineResource({
  id: "contracts.entitlements",
  description: "Entitlement and coverage records tied to live agreements.",
  businessPurpose: "Make service and commercial rights explicit before downstream execution occurs.",
  table: secondaryRecordsTable,
  contract: secondaryRecordSchema,
  fields: {
    label: { searchable: true, sortable: true, label: "Label" },
    status: { filter: "select", label: "Status" },
    requestedAction: { searchable: true, sortable: true, label: "Requested Action" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["label", "status", "requestedAction", "updatedAt"]
  },
  portal: { enabled: false }
});

export const BusinessExceptionResource = defineResource({
  id: "contracts.billing-schedules",
  description: "Recurring and milestone billing schedule records derived from governed contracts.",
  businessPurpose: "Request downstream financial work without letting agreements mutate accounting truth directly.",
  table: exceptionRecordsTable,
  contract: exceptionRecordSchema,
  fields: {
    severity: { filter: "select", label: "Severity" },
    status: { filter: "select", label: "Status" },
    reasonCode: { searchable: true, sortable: true, label: "Reason" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["severity", "status", "reasonCode", "updatedAt"]
  },
  portal: { enabled: false }
});

export const businessResources = [
  BusinessPrimaryResource,
  BusinessSecondaryResource,
  BusinessExceptionResource
] as const;

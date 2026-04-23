import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "contracts.registry.create",
    "label": "Create Contract",
    "phase": "create",
    "methodName": "createContract"
  },
  {
    "id": "contracts.entitlements.activate",
    "label": "Activate Entitlement",
    "phase": "advance",
    "methodName": "activateEntitlement"
  },
  {
    "id": "contracts.billing-schedules.publish",
    "label": "Publish Billing Schedule",
    "phase": "reconcile",
    "methodName": "publishBillingSchedule"
  }
] as const;

export async function createContract(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function activateEntitlement(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function publishBillingSchedule(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}

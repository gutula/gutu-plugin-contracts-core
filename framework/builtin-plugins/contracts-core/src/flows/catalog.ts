import {
  advancePrimaryRecord,
  amendPrimaryRecord,
  createPrimaryRecord,
  placePrimaryRecordOnHold,
  reconcilePrimaryRecord,
  releasePrimaryRecordHold,
  reversePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type AmendPrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type PlacePrimaryRecordOnHoldInput,
  type ReconcilePrimaryRecordInput,
  type ReleasePrimaryRecordHoldInput,
  type ReversePrimaryRecordInput
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
  },
  {
    "id": "contracts.registry.hold",
    "label": "Place Record On Hold",
    "phase": "hold",
    "methodName": "placeRecordOnHold"
  },
  {
    "id": "contracts.registry.release",
    "label": "Release Record Hold",
    "phase": "release",
    "methodName": "releaseRecordHold"
  },
  {
    "id": "contracts.registry.amend",
    "label": "Amend Record",
    "phase": "amend",
    "methodName": "amendRecord"
  },
  {
    "id": "contracts.registry.reverse",
    "label": "Reverse Record",
    "phase": "reverse",
    "methodName": "reverseRecord"
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

export async function placeRecordOnHold(input: PlacePrimaryRecordOnHoldInput) {
  return placePrimaryRecordOnHold(input);
}

export async function releaseRecordHold(input: ReleasePrimaryRecordHoldInput) {
  return releasePrimaryRecordHold(input);
}

export async function amendRecord(input: AmendPrimaryRecordInput) {
  return amendPrimaryRecord(input);
}

export async function reverseRecord(input: ReversePrimaryRecordInput) {
  return reversePrimaryRecord(input);
}

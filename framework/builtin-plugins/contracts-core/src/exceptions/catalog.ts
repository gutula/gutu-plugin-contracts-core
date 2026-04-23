export const exceptionQueueDefinitions = [
  {
    "id": "renewal-review",
    "label": "Renewal Review",
    "severity": "medium",
    "owner": "commercial-owner",
    "reconciliationJobId": "contracts.reconciliation.run"
  },
  {
    "id": "entitlement-conflict-review",
    "label": "Entitlement Conflict Review",
    "severity": "medium",
    "owner": "commercial-owner",
    "reconciliationJobId": "contracts.reconciliation.run"
  },
  {
    "id": "contract-amendment-approval",
    "label": "Contract Amendment Approval",
    "severity": "medium",
    "owner": "commercial-owner",
    "reconciliationJobId": "contracts.reconciliation.run"
  }
] as const;

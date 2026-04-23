export const scenarioDefinitions = [
  {
    "id": "contract-activation",
    "owningPlugin": "contracts-core",
    "workflowId": "contracts-lifecycle",
    "actionIds": [
      "contracts.registry.create",
      "contracts.entitlements.activate",
      "contracts.billing-schedules.publish",
      "contracts.registry.hold",
      "contracts.registry.release",
      "contracts.registry.amend",
      "contracts.registry.reverse"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "schedule-publication",
    "owningPlugin": "contracts-core",
    "workflowId": "contracts-lifecycle",
    "actionIds": [
      "contracts.registry.create",
      "contracts.entitlements.activate",
      "contracts.billing-schedules.publish",
      "contracts.registry.hold",
      "contracts.registry.release",
      "contracts.registry.amend",
      "contracts.registry.reverse"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "renewal-or-amendment",
    "owningPlugin": "contracts-core",
    "workflowId": "contracts-lifecycle",
    "actionIds": [
      "contracts.registry.create",
      "contracts.entitlements.activate",
      "contracts.billing-schedules.publish",
      "contracts.registry.hold",
      "contracts.registry.release",
      "contracts.registry.amend",
      "contracts.registry.reverse"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;

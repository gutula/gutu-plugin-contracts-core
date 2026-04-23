export const reportDefinitions = [
  {
    "id": "contracts-core.report.01",
    "label": "Contract Renewal Summary",
    "owningPlugin": "contracts-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "renewal-review",
      "entitlement-conflict-review",
      "contract-amendment-approval"
    ]
  },
  {
    "id": "contracts-core.report.02",
    "label": "Entitlement Coverage",
    "owningPlugin": "contracts-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "renewal-review",
      "entitlement-conflict-review",
      "contract-amendment-approval"
    ]
  },
  {
    "id": "contracts-core.report.03",
    "label": "Billing Schedule Forecast",
    "owningPlugin": "contracts-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "renewal-review",
      "entitlement-conflict-review",
      "contract-amendment-approval"
    ]
  }
] as const;

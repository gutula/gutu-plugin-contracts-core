export const domainCatalog = {
  "erpnextModules": [
    "CRM",
    "Selling"
  ],
  "erpnextDoctypes": [
    "Contract",
    "Contract Template",
    "Contract Fulfilment Checklist"
  ],
  "ownedEntities": [
    "Contract Register",
    "Entitlement Rule",
    "Billing Schedule",
    "Renewal Reminder",
    "Contract Amendment"
  ],
  "reports": [
    "Contract Renewal Summary",
    "Entitlement Coverage",
    "Billing Schedule Forecast"
  ],
  "exceptionQueues": [
    "renewal-review",
    "entitlement-conflict-review",
    "contract-amendment-approval"
  ],
  "operationalScenarios": [
    "contract-activation",
    "schedule-publication",
    "renewal-or-amendment"
  ],
  "settingsSurfaces": [
    "Contract Template",
    "Sales Settings"
  ],
  "edgeCases": [
    "contract supersession",
    "renewal without revised pricing",
    "entitlement overlap"
  ]
} as const;

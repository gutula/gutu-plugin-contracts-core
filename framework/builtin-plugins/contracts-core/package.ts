import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "contracts-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-contracts-core",
  "displayName": "Contracts Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "sales_commerce",
    "subcategoryLabel": "Sales & Commerce"
  },
  "description": "Contract register, commercial or service entitlements, renewal posture, and governed billing schedule truth for long-running business agreements.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core",
    "party-relationships-core",
    "sales-core",
    "support-service-core",
    "traceability-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Contracts Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Contracts Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Contracts Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for Contracts Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Contracts Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "party-relationships-core",
      "class": "required",
      "rationale": "Required for Contracts Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "sales-core",
      "class": "required",
      "rationale": "Required for Contracts Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "support-service-core",
      "class": "required",
      "rationale": "Required for Contracts Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "traceability-core",
      "class": "required",
      "rationale": "Required for Contracts Core to keep its boundary governed and explicit."
    }
  ],
  "optionalWith": [],
  "conflictsWith": [],
  "providesCapabilities": [
    "contracts.registry",
    "contracts.entitlements",
    "contracts.billing-schedules"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.contracts",
    "events.publish.contracts"
  ],
  "ownsData": [
    "contracts.registry",
    "contracts.entitlements",
    "contracts.billing-schedules",
    "contracts.renewals"
  ],
  "extendsData": [],
  "publicCommands": [
    "contracts.registry.create",
    "contracts.entitlements.activate",
    "contracts.billing-schedules.publish",
    "contracts.registry.hold",
    "contracts.registry.release",
    "contracts.registry.amend",
    "contracts.registry.reverse"
  ],
  "publicQueries": [
    "contracts.registry-summary",
    "contracts.entitlement-summary"
  ],
  "publicEvents": [
    "contracts.registered.v1",
    "contracts.entitlement-activated.v1",
    "contracts.billing-schedule-published.v1"
  ],
  "domainCatalog": {
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
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});

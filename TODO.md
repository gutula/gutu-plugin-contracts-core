# Contracts Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

- Exports 3 governed actions: `contracts.registry.create`, `contracts.entitlements.activate`, `contracts.billing-schedules.publish`.
- Owns 3 resource contracts: `contracts.registry`, `contracts.entitlements`, `contracts.billing-schedules`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 5 owned entity surface(s): `Contract Register`, `Entitlement Rule`, `Billing Schedule`, `Renewal Reminder`, `Contract Amendment`.
- Carries 3 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `CRM`, `Selling`.
- Operational scenario matrix includes `contract-activation`, `schedule-publication`, `renewal-or-amendment`.
- Governs 2 settings or policy surface(s) for operator control and rollout safety.

## Current Gaps

- Repo-local documentation verification entrypoints were missing before this pass and need to stay green as the repo evolves.

## Recommended Next

- Deepen amendment, renewal, and entitlement exception handling as more commercial flows rely on contracts as a primary boundary.
- Clarify downstream accounting and service entitlement handoff rules before higher-volume recurring operations go live.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Contract`, `Contract Template`, `Contract Fulfilment Checklist`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.

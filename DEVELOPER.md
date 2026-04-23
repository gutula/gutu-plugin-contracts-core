# Contracts Core Developer Guide

Contract register, commercial or service entitlements, renewal posture, and governed billing schedule truth for long-running business agreements.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Owns long-running agreement, entitlement, and billing-schedule truth so recurring or governed commercial commitments stay explicit.

### This plugin is the right fit when

- You need **contracts**, **entitlements**, **billing schedules** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/contracts-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/contracts-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/contracts-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/contracts-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/contracts-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/contracts-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/contracts-core` |
| Manifest ID | `contracts-core` |
| Display Name | Contracts Core |
| Domain Group | Operational Data |
| Default Category | Business / Sales & Commerce |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `party-relationships-core`, `sales-core`, `support-service-core`, `traceability-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.contracts`, `events.publish.contracts` |
| Provides Capabilities | `contracts.registry`, `contracts.entitlements`, `contracts.billing-schedules` |
| Owns Data | `contracts.registry`, `contracts.entitlements`, `contracts.billing-schedules`, `contracts.renewals` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `contracts.registry.create` | Permission: `contracts.registry.write` | Create Contract<br>Idempotent<br>Audited |
| Action | `contracts.entitlements.activate` | Permission: `contracts.entitlements.write` | Activate Entitlement<br>Non-idempotent<br>Audited |
| Action | `contracts.billing-schedules.publish` | Permission: `contracts.billing-schedules.write` | Publish Billing Schedule<br>Non-idempotent<br>Audited |
| Action | `contracts.registry.hold` | Permission: `contracts.registry.write` | Place Record On Hold<br>Non-idempotent<br>Audited |
| Action | `contracts.registry.release` | Permission: `contracts.registry.write` | Release Record Hold<br>Non-idempotent<br>Audited |
| Action | `contracts.registry.amend` | Permission: `contracts.registry.write` | Amend Record<br>Non-idempotent<br>Audited |
| Action | `contracts.registry.reverse` | Permission: `contracts.registry.write` | Reverse Record<br>Non-idempotent<br>Audited |
| Resource | `contracts.registry` | Portal disabled | Contract headers, commercial terms, and amendment-safe lifecycle records.<br>Purpose: Own agreement truth without burying long-running commitments inside orders or tickets.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `contracts.entitlements` | Portal disabled | Entitlement and coverage records tied to live agreements.<br>Purpose: Make service and commercial rights explicit before downstream execution occurs.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `contracts.billing-schedules` | Portal disabled | Recurring and milestone billing schedule records derived from governed contracts.<br>Purpose: Request downstream financial work without letting agreements mutate accounting truth directly.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `contracts.projections.refresh` | `contracts-projections` | Retry policy not declared | No timeout declared |
| `contracts.reconciliation.run` | `contracts-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `contracts-lifecycle` | `commercial-owner`, `approver`, `controller` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep agreement and entitlement state explicit across renewals, amendments, and downstream billing. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `contracts.projections.refresh`, `contracts.reconciliation.run`.
- Workflow surface: `contracts-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/contracts-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/contracts-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["contracts.registry.create"]
  action --> validation["Schema + permission guard"]
  validation --> service["Contracts Core service layer"]
  service --> state["contracts.registry"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, createContractAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/contracts-core";

export const pluginSurface = {
  manifest,
  createContractAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, createContractAction } from "@plugins/contracts-core";

console.log("plugin", manifest.id);
console.log("action", createContractAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

- Exports 7 governed actions: `contracts.registry.create`, `contracts.entitlements.activate`, `contracts.billing-schedules.publish`, `contracts.registry.hold`, `contracts.registry.release`, `contracts.registry.amend`, `contracts.registry.reverse`.
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

### Current gaps

- No extra gaps were discovered beyond the plugin’s declared boundaries.

### Recommended next

- Deepen amendment, renewal, and entitlement exception handling as more commercial flows rely on contracts as a primary boundary.
- Clarify downstream accounting and service entitlement handoff rules before higher-volume recurring operations go live.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Contract`, `Contract Template`, `Contract Fulfilment Checklist`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.

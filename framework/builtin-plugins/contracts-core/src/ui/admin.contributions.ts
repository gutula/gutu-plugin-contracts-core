import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "contracts",
      label: "Contracts",
      icon: "file-signature",
      description: "Agreement lifecycle, entitlements, and long-running billing posture.",
      permission: "contracts.registry.read",
      homePath: "/admin/business/contracts",
      quickActions: ["contracts-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "contracts",
      group: "control-room",
      items: [
        {
          id: "contracts-core.overview",
          label: "Control Room",
          icon: "file-signature",
          to: "/admin/business/contracts",
          permission: "contracts.registry.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "contracts-core.page",
      kind: "dashboard",
      route: "/admin/business/contracts",
      label: "Contracts Control Room",
      workspace: "contracts",
      group: "control-room",
      permission: "contracts.registry.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "contracts-core.open.control-room",
      label: "Open Contracts Core",
      permission: "contracts.registry.read",
      href: "/admin/business/contracts",
      keywords: ["contracts core","contracts","business"]
    })
  ]
};

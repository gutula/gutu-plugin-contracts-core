import { describe, expect, it } from "bun:test";

import {
  buildContractsCoreSqliteMigrationSql,
  buildContractsCoreSqliteRollbackSql,
  getContractsCoreSqliteLookupIndexName,
  getContractsCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("contracts-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildContractsCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS contracts_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS contracts_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS contracts_core_exception_records");
    expect(sql).toContain(getContractsCoreSqliteLookupIndexName("contracts_core_"));
    expect(sql).toContain(getContractsCoreSqliteStatusIndexName("contracts_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildContractsCoreSqliteRollbackSql({ tablePrefix: "contracts_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS contracts_core_preview_exception_records");
  });
});

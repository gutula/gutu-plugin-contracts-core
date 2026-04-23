import { describe, expect, it } from "bun:test";

import {
  buildContractsCoreMigrationSql,
  buildContractsCoreRollbackSql,
  getContractsCoreLookupIndexName,
  getContractsCoreStatusIndexName
} from "../../src/postgres";

describe("contracts-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildContractsCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS contracts_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS contracts_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS contracts_core.exception_records");
    expect(sql).toContain(getContractsCoreLookupIndexName());
    expect(sql).toContain(getContractsCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildContractsCoreRollbackSql({ schemaName: "contracts_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS contracts_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS contracts_core_preview CASCADE");
  });
});

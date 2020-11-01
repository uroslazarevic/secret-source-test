import * as Knex from "knex";
import { T, RoadLicenceTable } from "../types/tables";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(T.road_licences, function (table) {
    table.increments();
    table.timestamps(true, true);
    table.string(RoadLicenceTable.name).notNullable();
    table.string(RoadLicenceTable.email).notNullable();
    table.string(RoadLicenceTable.licence).defaultTo(null);
    table.string(RoadLicenceTable.published_at).defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(T.road_licences);
}

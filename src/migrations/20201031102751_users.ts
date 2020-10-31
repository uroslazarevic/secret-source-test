import * as Knex from "knex";
import { T, UserTable } from "../types/tables";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(T.users, function (table) {
    table.increments();
    table.timestamps(true, true);
    table.string(UserTable.name);
    table.string(UserTable.email);
    table.string(UserTable.password);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}

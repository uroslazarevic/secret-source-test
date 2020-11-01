import * as Knex from "knex";
import { T, UserTable } from "../types/tables";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(T.users, function (table) {
    table.increments();
    table.timestamps(true, true);
    table.string(UserTable.email_verified_at);
    table.string(UserTable.name).notNullable();
    table.string(UserTable.email).notNullable();
    table.string(UserTable.password).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(T.users);
}

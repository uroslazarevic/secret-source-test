import * as Knex from "knex";
import { T, UserTable } from "../types/tables";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(T.users, function (table) {
    table.increments();
    table.string(UserTable.name).notNullable();
    table.string(UserTable.email).notNullable();
    table.string(UserTable.password).notNullable();
    table.timestamp(UserTable.created_at).defaultTo(knex.fn.now());
    table.timestamp(UserTable.updated_at).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}

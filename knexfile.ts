import * as knex from "knex";
import { settings } from "./src/settings";

export const assertDatabaseConnection = (database) => {
  return database
    .raw("select 1+1 as result")
    .then(() => {
      console.log("Database connection established!");
    })
    .catch((err) => {
      console.log("[Fatal] Failed to establish connection to database! Exiting...");
      console.log(err);
      process.exit(1);
    });
};

const knexSettings = {
  development: {
    client: settings.db.client,
    connection: {
      database: settings.db.name,
      user: settings.db.username,
      password: settings.db.password,
      host: settings.db.host,
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/src/migrations",
    },
  },

  production: {
    client: settings.db.client,
    connection: {
      database: settings.db.name,
      user: settings.db.username,
      password: settings.db.password,
      host: settings.db.host,
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/src/migrations",
    },
  },
};

export const db = knex(knexSettings[settings.environment]);
// We have to export default knex settings in order migrations to work
export default knexSettings;

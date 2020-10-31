// Update with your config settings.
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

export default {
  development: {
    client: settings.db.client,
    connection: {
      database: settings.db.name,
      user: settings.db.username,
      password: settings.db.password,
      host: settings.db.host,
    },
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
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/src/migrations",
    },
  },
};

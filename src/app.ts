import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as lodash from "lodash";

import { settings } from "./settings";
import { db, assertDatabaseConnection } from "./../knexfile";
import authRouter from "./routers/auth_router";
import csvRouter from "./routers/csv_router";

import { ICustomError } from "./lib/errors";
import { CronJob } from "./lib/cron_job";

assertDatabaseConnection(db);

const cronJob = new CronJob();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routers
app.use(authRouter);
app.use(csvRouter);

// Error handler
app.use((error: ICustomError, req, res, next) => {
  console.error("[Error middleware]:", error);
  res.status((lodash.isFinite(error.code) && error.code) || 500).json(error);
});

app.listen(settings.port, () => {
  // Initialize cron job
  cronJob.reportLicencedDrivers();
  console.log(`Server listening on port: ${settings.port}`);
});

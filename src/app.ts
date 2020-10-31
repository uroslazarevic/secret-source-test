import * as knex from "knex";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { settings } from "./settings";
import knexSettings, { assertDatabaseConnection } from "./../knexfile";

const database = knex(knexSettings[settings.environment]);

assertDatabaseConnection(database);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", require("./routers/userRouter"));

app.listen(settings.port, () => {
  console.log(`Server listening on port: ${settings.port}`);
});

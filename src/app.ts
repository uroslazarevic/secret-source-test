import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(3000, () => {
  console.log(`Server listening on port: ${3000}`);
});

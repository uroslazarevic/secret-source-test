import { T } from "../types/tables";
import { db } from "../../knexfile";
import { CustomError } from "../lib/errors";

export default class CSVService {
  async upload(data) {
    return data;
  }
}

// *********************************************

class ICSVError extends CustomError {}

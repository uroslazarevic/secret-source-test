import * as fs from "fs";
import * as csv from "fast-csv";
import CSVService, { CSVFileRequiredError } from "../services/csv_service";
import { paths } from "../settings";
import { IRoadLicenceCSVPayload, RoadLicence } from "../types/road_licence";
import RoadLicenceService from "../services/road_licence_service";

const csvService = new CSVService();
const roadLicenceService = new RoadLicenceService();

export default class CSVController {
  async upload(req, res, next) {
    try {
      if (!req.file) {
        throw new CSVFileRequiredError();
      }

      const roadLicences = [];
      const path = paths.csvUploadLocation + req.file.filename;
      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error;
        })
        .on("data", (row: IRoadLicenceCSVPayload) => {
          roadLicences.push(row);
        })
        .on("end", async () => {
          await csvService.uploadRoadLicence(roadLicences);
          // Delete file after upload
          fs.unlinkSync(path);
          return res.status(200).json({ message: "Successfully uploaded csv record: " + req.file.filename });
        });
    } catch (error) {
      next(error);
    }
  }

  // NOTE: for testing purposes
  async report(req, res, next) {
    try {
      await roadLicenceService.validateLicences();
      return res.status(200).json({ message: "All certification are emailed" });
    } catch (error) {
      next(error);
    }
  }
}

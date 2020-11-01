import * as fs from "fs";
import * as csv from "fast-csv";
import CSVService, { CSVFileRequiredError } from "../services/csv_service";
import { paths } from "../settings";
import { IRoadLicenceCSVPayload, RoadLicence } from "../types/road_licence";
import RoadLicenceService from "../services/road_licence_service";
import { fileURLToPath } from "url";

const csvService = new CSVService();

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
          return res.status(200).json({ message: "Successfully uploaded csv records: " + req.file.filename });
        });
    } catch (error) {
      next(error);
    }
  }

  async test(req, res, next) {
    try {
      return res.json(new RoadLicenceService().validateLicences());
    } catch (error) {
      next(error);
    }
  }
}

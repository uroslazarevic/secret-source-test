import RoadLicenceService from "../services/road_licence_service";
import { CustomError } from "../lib/errors";

const roadLicenceService = new RoadLicenceService();

export default class CSVService {
  async uploadRoadLicence(roadLicences) {
    return await roadLicenceService.createBulk(roadLicences);
  }
}

// *********************************************

class CSVError extends CustomError {}

export class CSVFileRequiredError extends CSVError {
  constructor() {
    super("Please upload a CSV file", 400);
  }
}

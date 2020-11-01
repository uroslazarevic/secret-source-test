import * as cron from "node-cron";
import RoadLicenceService from "../services/road_licence_service";
import { settings } from "../settings";

const roadLicenceService = new RoadLicenceService();

export class CronJob {
  reportLicencedDrivers() {
    // Schedule a task to run everyday at (settings.cronJobVerifyLicencesTime)
    cron.schedule(`0 ${settings.cronJobVerifyLicencesTime} * * *`, function () {
      roadLicenceService.validateLicences();
    });
  }
}

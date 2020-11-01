import { T, RoadLicenceTable } from "../types/tables";
import { db } from "../../knexfile";
import { CustomError } from "../lib/errors";
import { RoadLicence, IRoadLicence, IRoadLicenceCSVPayload } from "../types/road_licence";
import { EmailService } from "../lib/email";

const emailService = new EmailService();

export default class RoadLicenceService {
  async createOne(roadLicenceData: IRoadLicenceCSVPayload) {
    const roadLicence = new RoadLicence(roadLicenceData);
    return (await db(T.road_licences).insert(roadLicence, Object.keys(RoadLicenceTable)))[0];
  }

  async createBulk(roadLicences: IRoadLicence[]) {
    return db(T.road_licences).insert(roadLicences);
  }

  async findAll(data: Partial<IRoadLicence>): Promise<IRoadLicence[]> {
    return await db(T.road_licences).where(data).select("*");
  }

  async updateOne(expression, data: Partial<IRoadLicence>): Promise<IRoadLicence> {
    return (await db(T.road_licences).where(expression).update(data, Object.keys(RoadLicenceTable)))[0];
  }

  async findOne(data): Promise<IRoadLicence> {
    return db(T.road_licences).where(data).select("*").first();
  }

  async validateLicences() {
    try {
      const uncertifiedRecords = await this.findAll({ published_at: null, licence: null });

      return await Promise.all(
        uncertifiedRecords.map(async (record) => {
          // Send certification email to users
          const certifiedRecord = await this.updateOne(
            { id: record.id },
            { licence: `${record.email}_${Date.now()}`, published_at: new Date() }
          );

          emailService.sendCertificationToUsers(certifiedRecord);
        })
      );
    } catch (err) {
      throw err;
    }
  }
}

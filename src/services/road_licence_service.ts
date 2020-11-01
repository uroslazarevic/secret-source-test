import { IUser, User } from "../types/user";
import { T, RoadLicenceTable } from "../types/tables";
import { db } from "../../knexfile";
import { CustomError } from "../lib/errors";
import { RoadLicence, IRoadLicence, IRoadLicenceCSVPayload } from "../types/road_licence";

export default class RoadLicenceService {
  async create(roadLicenceData: IRoadLicenceCSVPayload) {
    const roadLicence = new RoadLicence(roadLicenceData);
    return db(T.road_licences).insert(roadLicence);
  }

  async createBulk(roadLicences: IRoadLicence[]) {
    return db(T.road_licences).insert(roadLicences);
  }

  async find(data: Partial<IRoadLicence>): Promise<IRoadLicence[]> {
    return await db(T.road_licences).where(data).select("*");
  }

  async update(expression, data: Partial<IRoadLicence>): Promise<IRoadLicence[]> {
    return db(T.road_licences).where(expression).update(data, Object.keys(RoadLicenceTable));
  }

  async findOne(data): Promise<IRoadLicence> {
    return db(T.road_licences).where(data).select("*").first();
  }

  async validateLicences() {
    const unlicencedDrivers = await this.find({ published_at: null, licence: null });
    return await Promise.all(
      unlicencedDrivers.map(
        async (record) =>
          await this.update({ id: record.id }, { licence: `${record.email}_${Date.now()}`, published_at: new Date() })
      )
    );
  }
}

// *********************************************

class IRoadLicenceError extends CustomError {}

export class IUserEmailTakenError extends IRoadLicenceError {
  constructor() {
    super(`This email is already taken. Please try again.`, 401);
  }
}

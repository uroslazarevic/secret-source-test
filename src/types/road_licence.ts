import { Model } from "./index";

export interface IRoadLicence {
  id?: string;
  /**
   * User name
   */
  name: string;
  /**
   * Email address
   */
  email: string;
  /**
   * Licence field that user will recieve
   */
  licence?: string;
  /**
   * @type {Date}
   */
  published_at?: Date;
  /**
   * @type {Date}
   */
  created_at?: Date;
  /**
   * @type {Date}
   */
  updated_at?: Date;
}

export class RoadLicence extends Model implements IRoadLicence {
  name;
  email;
  constructor(source: IRoadLicence) {
    super();
    this.name = null;
    this.email = null;

    // Safely assign values
    this.assign(source);
  }
}

export interface IRoadLicenceCSVPayload
  extends Omit<IRoadLicence, "id" | "licence" | "published_at" | "created_at" | "updated_at"> {}

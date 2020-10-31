import { Model } from "./index";
import * as bcrypt from "bcrypt";

export interface IUser {
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
   * Bcrypt-ed password hash
   */
  password: string;
  /**
   * @type {Date}
   */
  created_at?: number;
  /**
   * @type {Date}
   */
  updated_at?: number;
}

export class User extends Model implements IUser {
  name;
  email;
  password;
  updated_at;
  constructor(source: IUser) {
    super();
    this.name = null;
    this.email = null;
    this.password = null;

    // Safely assign values
    this.assign(source);
  }

  static generateHash = async (password) => {
    const hash = await bcrypt.hash(password, 8);
    return hash;
  };

  static validatePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  };
}

export class IUserLoginData extends Model implements Omit<IUser, "password"> {
  id: string;
  /**
   * User name
   */
  name: string;
  /**
   * Email address
   */
  email: string;
  /**
   * @type {Date}
   */
  created_at?: number;
  /**
   * @type {Date}
   */
  updated_at?: number;
  /**
   * Access token used for logging in
   */
  access_token;

  constructor(source: IUser, access_token: string) {
    super();
    this.id = null;
    this.name = null;
    this.email = null;
    this.created_at = null;
    this.updated_at = null;
    this.access_token = access_token;
    // Safely assign values
    this.assign(source);
  }
}

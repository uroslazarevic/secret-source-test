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
   * Email verified date
   */
  email_verified_at?: Date;
  /**
   * Bcrypt-ed password hash
   */
  password: string;
  /**
   * @type {Date}
   */
  created_at?: Date;
  /**
   * @type {Date}
   */
  updated_at?: Date;
}

export class User extends Model implements IUser {
  name;
  email;
  password;
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

export interface IUserRegisterPayload extends Omit<IUser, "id" | "created_at" | "updated_at"> {}
export interface IUserLoginPayload extends Omit<IUser, "id" | "name" | "created_at" | "updated_at"> {}

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
  created_at?: Date;
  /**
   * @type {Date}
   */
  updated_at?: Date;
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

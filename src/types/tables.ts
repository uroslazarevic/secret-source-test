import { IUser } from "./user";
import { IRoadLicence } from "./road_licence";

// Users
export type IUserTable = { [key in keyof IUser]: key };
export const UserTable: IUserTable = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  email_verified_at: "email_verified_at",
  created_at: "created_at",
  updated_at: "updated_at",
};

// RoadLicence
export type IRoadLicenceTable = { [key in keyof IRoadLicence]: key };
export const RoadLicenceTable: IRoadLicenceTable = {
  id: "id",
  name: "name",
  email: "email",
  licence: "licence",
  published_at: "published_at",
  created_at: "created_at",
  updated_at: "updated_at",
};

export const T = {
  users: "users",
  road_licences: "road_licences",
};

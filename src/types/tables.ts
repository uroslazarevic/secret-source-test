import { IUser } from "./user";

export type IUserTable = { [key in keyof IUser]: key };
export const UserTable: IUserTable = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  created_at: "created_at",
  updated_at: "updated_at",
};

export const T = {
  users: "users",
};

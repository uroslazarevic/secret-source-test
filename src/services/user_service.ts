import { IUser, User } from "../types/user";
import { T, UserTable } from "../types/tables";
import { db } from "../../knexfile";
import { CustomError } from "../lib/errors";
import { settings } from "../settings";

export default class UserService {
  async createOne(userData: IUser) {
    const user = new User(userData);
    user.password = await User.generateHash(user.password);
    return (await db(T.users).insert(user, Object.keys(UserTable)))[0];
  }

  async findAll(data: Partial<IUser>): Promise<IUser[]> {
    return db.where(data).select("*").from("users");
  }

  async findOne(data: Partial<IUser>): Promise<IUser> {
    return db(T.users).where(data).select("*").first();
  }
}

// *********************************************

class IUserError extends CustomError {}

export class IUserEmailTakenError extends IUserError {
  constructor() {
    super(`This email is already taken. Please try again.`, 401);
  }
}
export class InvalidLoginDataError extends IUserError {
  constructor() {
    super(`Incorrect password or email. Please try again.`, 401);
  }
}

export class EmailNotVerified extends IUserError {
  constructor() {
    super(`Please verify your email first.`, 401);
  }
}

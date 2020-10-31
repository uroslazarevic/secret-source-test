import { IUser, User } from "../types/user";
import { T } from "../types/tables";
import { db } from "../../knexfile";
import { CustomError } from "../lib/errors";

export default class UserService {
  async create(userData: IUser) {
    const user = new User(userData);
    user.password = await User.generateHash(user.password);
    return db(T.users).insert(user);
  }

  async findAll(): Promise<IUser[]> {
    return db.select("*").from("users");
  }

  async findOne(data: Partial<IUser>): Promise<IUser> {
    return db(T.users).where(data).select("*").first();
  }
}

// *********************************************

class IUserError extends CustomError {}

export class IInvalidLoginData extends IUserError {
  constructor() {
    super(`Incorrect password or email. Please try again.`, 401);
  }
}

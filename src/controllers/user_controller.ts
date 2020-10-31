import { IUser, User } from "../types/user";

export default class UserController {
  private create(userData: IUser) {
    return new User(userData);
  }
}

// *******************************************************

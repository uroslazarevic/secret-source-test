import { IUser } from "../types/user";
import { Token, InvalidAuthToken } from "../lib/token";
import UserService from "../services/user_service";
import { ServerError } from "../lib/errors";
const userService = new UserService();

export const checkAuth = async (req, res, next) => {
  try {
    const access_token = req.header("Authorization");
    if (!access_token) {
      throw new InvalidAuthToken();
    }
    const tokenString = req.header("Authorization").replace("Bearer ", "");
    const userData: IUser = await Token.decodeToken(tokenString);
    const user = await userService.findOne({ id: userData.id });
    if (!user) {
      throw new ServerError();
    }
    // Save user in request if he is authenthicated
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

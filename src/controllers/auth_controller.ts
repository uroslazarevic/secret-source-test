import { User, IUserLoginData, IUserRegisterPayload, IUserLoginPayload } from "../types/user";
import UserService, { IInvalidLoginDataError, IUserEmailTakenError } from "../services/user_service";
import { Token } from "../lib/token";

const userService = new UserService();

export default class AuthController {
  async register(req, res, next) {
    try {
      const userData: IUserRegisterPayload = req.body;
      const userExists = await userService.findOne({ email: userData.email });
      if (userExists) {
        throw new IUserEmailTakenError();
      }
      const user = await userService.create(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    const { password, email }: IUserLoginPayload = req.body;
    try {
      const user = await userService.findOne({ email });
      if (!user) {
        // User doesn't exists
        throw new IInvalidLoginDataError();
      }
      const isMatch = User.validatePassword(password, user.password);
      if (!isMatch) {
        // User doesn't exists
        throw new IInvalidLoginDataError();
      }

      const auth_token = Token.generateToken(user, "24h");
      return res.status(200).json(new IUserLoginData(user, auth_token));
    } catch (err) {
      next(err);
    }
  }
}

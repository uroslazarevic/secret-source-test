import { User, IUserLoginData } from "../types/user";
import UserService, { IInvalidLoginData } from "../services/user_service";
import { Token } from "../lib/token";

const userService = new UserService();

export default class AuthController {
  async register(req, res, next) {
    try {
      const { userData } = req.body;
      const user = await userService.create(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    const { password, email } = req.body;
    try {
      const user = await userService.findOne({ email });
      if (!user) {
        // User doesn't exists
        throw new IInvalidLoginData();
      }
      const isMatch = User.validatePassword(password, user.password);
      if (!isMatch) {
        // User doesn't exists
        throw new IInvalidLoginData();
      }

      const auth_token = Token.generateToken(user, "24h");
      return res.status(200).json(new IUserLoginData(user, auth_token));
    } catch (err) {
      next(err);
    }
  }
}

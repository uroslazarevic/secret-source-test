import { User, IUserLoginData, IUserRegisterPayload, IUserLoginPayload } from "../types/user";
import UserService, { InvalidLoginDataError, IUserEmailTakenError } from "../services/user_service";
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
      const user = await userService.createOne(userData);
      return res.status(201).json({ message: "Signup successfull!", user });
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
        throw new InvalidLoginDataError();
      }
      const isMatch = User.validatePassword(password, user.password);
      if (!isMatch) {
        // User doesn't exists
        throw new InvalidLoginDataError();
      }

      const auth_token = Token.generateToken(user, "24h");
      return res.status(200).json(new IUserLoginData(user, auth_token));
    } catch (err) {
      next(err);
    }
  }
}

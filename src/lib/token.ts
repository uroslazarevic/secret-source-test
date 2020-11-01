import * as jwt from "jsonwebtoken";
import { settings } from "../settings";
import { CustomError } from "./errors";

export class Token {
  static generateToken = (data, expiresIn = "24h") => {
    const token = jwt.sign(data, settings.jwtSecret, { expiresIn });
    return token;
  };

  static decodeToken = async (token) => {
    try {
      return jwt.verify(token, settings.jwtSecret);
    } catch (err) {
      throw new InvalidAuthTokenError();
    }
  };
}

// *********************************************

class TokenError extends CustomError {}

export class InvalidAuthTokenError extends TokenError {
  constructor() {
    super("You need be authenthicated to access this route", 401);
  }
}

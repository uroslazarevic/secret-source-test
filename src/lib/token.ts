import * as jwt from "jsonwebtoken";
import { settings } from "../settings";

export class Token {
  static generateToken = (data, expiresIn = "24h") => {
    const token = jwt.sign(data, settings.jwtSecret, { expiresIn });
    return token;
  };

  static decodeToken = async (token) => {
    return jwt.verify(token, settings.jwtSecret);
  };
}

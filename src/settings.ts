require("dotenv").config();

interface ISettings {
  environment: string;
  port: string | number;
  db: {
    host: string;
    name: string;
    username: string;
    password: string;
    client: string;
  };
  jwtSecret: string;
  sendgridKey: string;
  frontendClient: string;
}
export const settings: ISettings = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    client: process.env.DB_CLIENT,
  },
  jwtSecret: process.env.JWT_SECRET,
  sendgridKey: process.env.SENDGRID_API_KEY,
  frontendClient: process.env.FRONTEND_CLiENT,
};

module.exports = {
  settings,
};

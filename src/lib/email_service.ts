import * as sendgrid from "@sendgrid/mail";
import { Token } from "./token";
import { settings } from "../settings";

export class EmailService {
  sendVerificationEmail = async (res, userData) => {
    const { username, email } = userData;
    // Create verification token
    const verificationToken = Token.generateToken(userData);
    // Send verification email
    const template = this.createTemplate(
      username,
      `
            To activate your Test-App account, please verify your email address.
            <br />
            <a
                style="font-size: 14px;text-decoration: underline;"
                href="${settings.frontendClient}/confirm/?token=${verificationToken}"
            >
                Confirm your email
            </a>
    `
    );

    this.sendEmail(email, "Verify your email address", template);
    return res.status(201).json({
      message: "Signup successfull! We have sent you an email, please confirm your account.",
    });
  };

  private sendEmail = (email, subject, template) => {
    const msg = {
      to: email,
      from: "test-app.com",
      subject,
      html: template,
    };
    sendgrid.send(msg);
  };

  private createTemplate(username, message) {
    return `
            <div
                style="
                width: 600px;
                margin: 0 auto;
                background: #F3F3F3;"
            >
                <div
                    style="
                        padding: 10px;
                        border-bottom: 1.5px solid #F3F3F3;
                        border-top-left-radius: 4px;
                        border-top-right-radius: 4px;
                        border-color: 1px solid #ccc;
                        background: #fff;
                        display: flex;
                        align-items: center;
                        "
                >
                    <div
                        style="font-size: 14px;
                        margin-bottom: 15px;
                        color: #000;"
                    >
                        Dear ${username},
                    </div>
                    <p>${message}</p>
                </div>
        </div>
  `;
  }
}

import { IRoadLicence } from "../types/road_licence";
import * as sendmail from "sendmail";

const mail = sendmail();

export class EmailService {
  sendCertificationToUsers = async (data: IRoadLicence) => {
    const { name, email } = data;
    // Create template
    const template = this.createTemplate(name, ` Your road licence id is: ${data.licence}.`);
    // Send email
    return this.sendEmail(email, "Verify your email address", template);
  };

  // TODO:
  // sendAccountVerificationEmail = async (data: IUserRegisterPayload) => {
  //   const { name, email } = data;
  //   // Create verification token
  //   const verificationToken = Token.generateToken(data);
  //   // Send verification email
  //   const template = this.createTemplate(
  //     name,
  //     `
  //           To activate your Test-App account, please verify your email address.
  //           <br />
  //           <a
  //               style="font-size: 14px;text-decoration: underline;"
  //               href="${settings.frontendClient}/confirm/?token=${verificationToken}"
  //           >
  //               Confirm your email
  //           </a>
  //   `
  //   );
  //   this.sendEmail(email, "Verify your email address", template);
  // };

  private sendEmail = (email, subject, template) => {
    const msg = {
      to: email,
      from: "noreply@testapp.com",
      subject,
      html: template,
    };
    mail(msg);
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
                    style="padding: 2rem;"
                >
                    <p
                        style="font-size: 14px;
                        margin-bottom: 15px;
                        color: #000;"
                    >
                        Dear ${username},
                    </p>
                    <p style="text-align:left; padding:1rem;">${message}</p>
                    <p style="text-align:left; padding:1rem;">
                      Take care, 
                      <br/>
                      Your Test-app
                    </p>
                </div>
        </div>
  `;
  }
}

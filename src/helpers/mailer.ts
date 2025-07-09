import nodemailer from "nodemailer";
import crypto from "crypto";

interface UserType {
  verifyToken?: string;
  verifyTokenExpire?: number;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpire?: number;
  save: () => Promise<void>;
}

export const sendMail = async ({
  email,
  emailtype,
  user,
}: {
  email: string;
  emailtype: "VERIFY" | "RESET";
  user: UserType;
}) => {
  try {
    if (!user) {
      throw new Error("User object is undefined");
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 3600000; 

    
    if (emailtype === "VERIFY") {
      user.verifyToken = token;
      user.verifyTokenExpire = tokenExpiry;
    } else if (emailtype === "RESET") {
      user.forgotPasswordToken = token;
      user.forgotPasswordTokenExpire = tokenExpiry;
    }

    await user.save(); 

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d9eecc067e65a9", 
        pass: "f771d05e707c17", 
      },
    });

    const actionPath = emailtype === "VERIFY" ? "verifyemail" : "resetpassword";
    const mailOptions = {
      from: "namratha@gmail.com",
      to: email,
      subject: emailtype === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
        <p>Click <a href="${process.env.DOMAIN}/${actionPath}?token=${token}">here</a> to ${
        emailtype === "VERIFY" ? "verify your email" : "reset your password"
      }.</p>
        <p>Or copy and paste this link into your browser:<br>${process.env.DOMAIN}/${actionPath}?token=${token}</p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    }
    console.error("Error in sendMail function:", message);
    throw new Error(message);
  }
};

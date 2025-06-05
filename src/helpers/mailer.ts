import nodemailer from "nodemailer";
import User from "@/model/userModel";
import crypto from "crypto";

export const sendMail = async ({ email, emailtype, userID }: any) => {
    try {
        // Generate a random plain token for verification/reset
        const token = crypto.randomBytes(32).toString("hex");

        // Calculate expiration date (1 hour from now)
        const tokenExpiry = Date.now() + 3600000;  // 1 hour from now

        let updateQuery;
        if (emailtype === "VERIFY") {
            updateQuery = {
                verifyToken: token,
                verifyTokenExpire: tokenExpiry,  // Set correct expiration time
            };
        } else if (emailtype === "RESET") {
            updateQuery = {
                forgotPasswordToken: token,
                forgotPasswordTokenExpire: tokenExpiry,  // Set correct expiration time
            };
        }

        // Update the user with the new token and expiration time
        const user = await User.findByIdAndUpdate(userID, updateQuery, { new: true });

        if (!user) {
            throw new Error("User not found");
        }

        // Setup the email transporter
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d9eecc067e65a9",
                pass: "f771d05e707c17"
            }
        });

        // Prepare the email content with the plain token (not the hashed one)
        const mailOptions = {
            from: "namratha@gmail.com",
            to: email,
            subject: emailtype === "VERIFY" ? "Verify Your Email" : "Reset Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a> to 
            ${emailtype === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below into your browser: <br> ${process.env.DOMAIN}/verifyemail?token=${token}</p>`
        };

        // Send the email
        const mailResponse = await transport.sendMail(mailOptions);

        // Return the response from sending the mail
        return mailResponse;
    } catch (error: any) {
        console.error("Error in sendMail function:", error);
        throw new Error(error.message);
    }
};
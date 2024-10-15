import nodemailer from "nodemailer";
import { getSignupTemplate } from "./mailTemplates";
import getSessionorRedirect from "../utils/getSessionorRedirect";

// Function to create the transporter dynamically once session is available
async function createTransporter() {
  // const session = await getSessionorRedirect(); // Wait for session data
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USER, // Use session email or fallback
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendMail({
  toEmail,
  html,
  subject,
  text,
}: {
  toEmail: string;
  html: string;
  subject: string;
  text: string;
}) {
  try {
    const transporter = await createTransporter(); // Wait for transporter with session
    await transporter.sendMail({
      from: process.env.SMTP_USER, // Sender address
      to: toEmail, // Recipient address
      html, // HTML body
      subject, // Email subject
      text, // Plaintext body
    });

    console.log("Email sended successfully.");
    return true; // Email sent successfully
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Error occurred while sending email
  }
}

// Usage example
// async function userSignup(email: string, name: string) {
//   const sent = await sendMail({ toEmail: email, ...getSignupTemplate(name) });
//   if (sent) {
//     // Email sent successfully
//   } else {
//     // There was an error
//   }
// }

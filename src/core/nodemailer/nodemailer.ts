import nodemailer from "nodemailer";
import { getSignupTemplate } from "./mailTemplates";

const transporter = nodemailer.createTransport({
  // @ts-expect-error
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

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
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toEmail,
      html,
      subject,
      text,
    });
    return true; // Email sent successfully
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Error occurred while sending email
  }
}

// Usage example:
// export async function userSignup(email:string, name:string){
//     const sent = await sendMail({toEmail:email, ...getSignupTemplate(name)})
//     if(sent) // Email sent successfully
//     else  // there was an error
// }

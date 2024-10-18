"use server";
import {
  getContactUsAdminTemplate,
  getContactUsAppreciationTemplate,
} from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";
import { cookies } from "next/headers";

export const sendContactEmail = async ({
  name,
  email,
  message,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  // const cookieStore = cookies();
  // const emailSentCookie = cookieStore.get("emailSent");

  // if (emailSentCookie && emailSentCookie.value === "true") {
  //   return { error: "You cannot send multiple emails." };
  // }

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail)
    return {
      error:
        "Cannot send emails at this moment. Try again later. Admin email not available.",
    };

  const sent = await sendMail({
    toEmail: adminEmail,
    ...getContactUsAdminTemplate(name, email, message, phone),
  });

  const sentToUser = await sendMail({
    toEmail: email,
    ...getContactUsAppreciationTemplate(name),
  });

  if (sent && sentToUser) {
    return {
      success:
        "Your message has been successfully sent. We appreciate you reaching out to us and will get back to you as soon as possible.",
    };
  }
  return { error: "Failed to send email. Please try again later." };
};

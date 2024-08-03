import { db } from "@/core/client/db";
import { getSignupTemplate } from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";

export default async function createUserIfNot({
  email,
  username,
  image,
}: {
  email: string;
  username: string;
  image?: string | null;
}) {
  try {
    const dbuser = await db.user.findUnique({ where: { email } });
    if (dbuser) return dbuser;
    const user = await db.user.create({
      data: {
        email,
        username,
        image: image ?? "",
      },
    });

    await sendMail({
      toEmail: user.email,
      ...getSignupTemplate(username),
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

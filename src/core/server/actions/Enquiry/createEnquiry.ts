"use server";
import { db } from "@/core/client/db";
import { getHotelInquiryTemplate } from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Enquiry } from "@prisma/client";

export const createEnquiryAction = async ({
  values,
  info,
}: {
  values: Pick<Enquiry, "phoneNumber" | "message">;
  info:
    | { type: "Agency"; agencyId: string }
    | { type: "Dmc"; dmcId: string }
    | { type: "Hotel"; hotelId: string };
}) => {
  const session = await getSessionorRedirect();
  // let config: any;
  // if (info.type === "Agency") config = { agencyId: info.agencyId };
  // else if (info.type === "Dmc") config = { dmcId: info.dmcId };
  // else config = { hotelId: info.hotelId };
  let config: any;
  if (info.type === "Agency")
    config = { Agency: { connect: { id: info.agencyId } } };
  else if (info.type === "Dmc")
    config = { Dmc: { connect: { id: info.dmcId } } };
  else config = { Hotel: { connect: { id: info.hotelId } } };

  try {
    let companyEmail: { contactEmail: string; name: string } | null;
    if (info.type === "Agency")
      companyEmail = await db.agency.findUnique({
        where: { id: info.agencyId },
        select: { contactEmail: true, name: true },
      });
    else if (info.type === "Dmc")
      companyEmail = await db.dMC.findUnique({
        where: { id: info.dmcId },
        select: { contactEmail: true, name: true },
      });
    else
      companyEmail = await db.hotel.findUnique({
        where: { id: info.hotelId },
        select: { contactEmail: true, name: true },
      });

    const res = await db.enquiry.create({
      data: {
        // title: values.title,
        phoneNumber: values.phoneNumber,
        message: values.message,
        user: { connect: { id: session.user.id } },
        ...config,
      },
    });

    if (companyEmail)
      await sendMail({
        toEmail: companyEmail.contactEmail,
        ...getHotelInquiryTemplate(
          session.user.name,
          session.user.email,
          values.message,
          values.phoneNumber,
          companyEmail.name
        ),
      });

    return { success: "Enquiry sent successfully." };
  } catch (error: any) {
    console.log(error);
    return {
      error:
        error.meta?.modelName === "Enquiry"
          ? "You can only send one query to a company."
          : "Failed to create enquiry.",
    };
  }
};

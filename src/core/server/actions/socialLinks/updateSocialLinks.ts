"use server";

import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { SocialMediaLinks } from "@prisma/client";

export const updateSocialLinks = async ({
  values,
  info,
}: {
  values: Partial<SocialMediaLinks>;
  info:
    | { type: "Agency"; agencyId: string }
    | { type: "Dmc"; dmcId: string }
    | { type: "Hotel"; hotelId: string };
}) => {
  const session = await getSessionorRedirect();
  const { id, ...rest } = values;
  const keys = Object.keys(rest);
  for (const key of keys) {
    try {
      // @ts-expect-error
      const url = new URL(rest[key]);
    } catch (error) {
      return { error: "Social Links Provided contain invalid links." };
    }
  }
  try {
    if (info.type === "Agency") {
      await db.socialMediaLinks.update({
        where: { id: id, agencyId: info.agencyId },
        data: {
          facebook: values.facebook,
          twitter: values.twitter,
          instagram: values.instagram,
          youtube: values.youtube,
          linkedin: values.linkedin,
        },
      });
    } else if (info.type === "Hotel") {
      await db.socialMediaLinks.update({
        where: { id, hotelId: info.hotelId },
        data: {
          facebook: values.facebook,
          twitter: values.twitter,
          instagram: values.instagram,
          youtube: values.youtube,
          linkedin: values.linkedin,
        },
      });
    } else {
      await db.socialMediaLinks.update({
        where: { id, dmcId: info.dmcId },
        data: {
          facebook: values.facebook,
          twitter: values.twitter,
          instagram: values.instagram,
          youtube: values.youtube,
          linkedin: values.linkedin,
        },
      });
    }
    return { success: "Social Media Links updated successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Error updating social links." };
  }
};

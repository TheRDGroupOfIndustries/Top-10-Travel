import { db } from "@/core/client/db";
import cloudinary, {
  FOLDER_NAME,
} from "@/core/server/cloudinary/cloudinary_config";
import { UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";

interface CloudinaryUploadResult extends UploadApiResponse {
  url: string;
  public_id: string;
}

interface Images {
  id: string;
  role: "DMC" | "Agency" | "Hotel";
  image: File;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const ids = formData.getAll("id") as string[];
    const roles = formData.getAll("role") as ("DMC" | "Agency" | "Hotel")[];
    const images = formData.getAll("image") as File[];

    if (ids.length !== roles.length || ids.length !== images.length) {
      throw new Error("Mismatched form data");
    }

    const imageObjects: Images[] = ids.map((id, index) => ({
      id,
      role: roles[index],
      image: images[index],
    }));

    if (!imageObjects || imageObjects.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    console.log("imageObjects", imageObjects);

    const cloudinaryConfig = {
      folder: `${FOLDER_NAME}/top10city`,
      resource_type: "auto" as const,
      allowed_formats: ["jpg", "jpeg", "png", "gif"],
    };

    await Promise.all(
      imageObjects.map(async (img) => {
        try {
          const bytes = await img.image.arrayBuffer();
          const buffer = Buffer.from(bytes);

          const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
              const uploadStream = cloudinary.v2.uploader.upload_stream(
                cloudinaryConfig,
                (error, result) => {
                  if (error || !result) {
                    reject(error || new Error("No upload result"));
                    return;
                  }
                  resolve(result as CloudinaryUploadResult);
                }
              );
              uploadStream.end(buffer);
            }
          );

          const modelMap: { [key: string]: any } = {
            DMC: db.topTenDMCCity,
            Agency: db.topTenAgencyCity,
            Hotel: db.topTenHotelCity,
          };

          const model = modelMap[img.role];
          if (model) {
            await model.update({
              where: { id: img.id },
              data: {
                imageId: result.public_id,
                image: result.url,
              },
            });
          }
        } catch (error) {
          console.error("Error uploading to Cloudinary:", error);
        }
      })
    );

    return NextResponse.json(
      { message: "Images uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}

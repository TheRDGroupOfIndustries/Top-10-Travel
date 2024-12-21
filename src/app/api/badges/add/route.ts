import { db } from "@/core/client/db";
import { FOLDER_NAME } from "@/core/server/cloudinary/cloudinary_config";
import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { AboutContent, CloudinaryUploadResult } from "../../about/admin/route";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const image = formData.get("image") as File;

  if (!image) {
    return NextResponse.json({ error: "Image are required" }, { status: 400 });
  }

  const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB limit
  if (image.size > maxSizeInBytes) {
    return NextResponse.json(
      { error: "Image size exceeds 5MB limit." },
      { status: 400 }
    );
  }

  try {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: `${FOLDER_NAME}/assets/badges`,
            resource_type: "auto",
            allowed_formats: ["jpg", "jpeg", "png", "gif"],
          },
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

    if (result) {
      const about = await db.tags.create({ data: {
        name,
        url: result.url,
        imageId: result.public_id
      } });

      return NextResponse.json(about);
    } else {
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

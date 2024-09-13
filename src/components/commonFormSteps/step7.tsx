"use client";
import {
  getSignature,
  saveToDatabase,
} from "@/core/server/cloudinary/clientUpload";
import { SocialMediaLinksSchema } from "../agency/agencySchema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const Step7 = ({
  register,
  errors,
  setValue,
  hidden,
  type,
}: {
  register: any;
  errors: any;
  setValue: any;
  hidden?: boolean;
  type: "agency" | "dmc" | "hotel";
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUploadData, setVideoUploadData] = useState<any>();
  const [percentUploaded, setPercentUploaded] = useState(0);

  const session = useSession();
  // const uploadVideo = async () => {
  //   if (!session.data) return;
  //   const file = inputRef.current?.files && inputRef.current.files[0];
  //   if (!file) {
  //     toast.error("No file selected");
  //     return;
  //   }
  //   if (file.type !== "video/mp4") {
  //     toast.error("Invalid file type");
  //     return;
  //   }

  //   try {
  //     // Get a signature using server action
  //     setIsUploading(true);
  //     const { timestamp, signature } = await getSignature(type);

  //     // Upload to Cloudinary using the signature
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
  //     formData.append("signature", signature);
  //     formData.append("timestamp", timestamp);
  //     formData.append("folder", "top10travels");
  //     formData.append("public_id", `${type}-${session.data.user.id}-video`);

  //     const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
  //     const sr = await axios.post(endpoint, formData, {
  //       onUploadProgress(e) {
  //         setPercentUploaded((e.loaded / (e.total ?? 1)) * 100);
  //       },
  //     });
  //     const data = sr.data;
  //     setValue("promotionalVideoUpload", data.secure_url);

  //     // // Write to the database using server actions
  //     // const res = await saveToDatabase({
  //     //   version: data?.version,
  //     //   signature: data?.signature,
  //     //   public_id: data?.public_id,
  //     // });

  //     // if (res?.success)
  //     toast.success("Video Uploaded Succesfully.");
  //   } catch (error) {
  //     console.error("Upload failed", error);
  //     toast.error("Upload failed. Please try again.");
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  return (
    <div className={cn(hidden ? "hidden" : "")}>
      <div>
        <Label className="text-sm font-medium">
          Social Media Links
          {errors?.socialMediaLinks && (
            <p className="text-red-500 text-xs">
              {errors.socialMediaLinks.message}
            </p>
          )}
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {errors?.socialMediaLinks?.facebook && (
              <p className="text-red-500 text-xs translate-y-2 bg-white max-w-fit">
                {errors?.socialMediaLinks?.facebook.message}
              </p>
            )}
            <Input
              {...register("socialMediaLinks.facebook")}
              id="facebook"
              type="text"
              placeholder="facebook"
              className="m-0 mt-1"
            />
          </div>
          <div>
            {errors?.socialMediaLinks?.instagram && (
              <p className="text-red-500 text-xs translate-y-2 bg-white max-w-fit">
                {errors?.socialMediaLinks?.instagram.message}
              </p>
            )}
            <Input
              {...register("socialMediaLinks.instagram")}
              id="instagram"
              type="text"
              placeholder="instagram"
              className="m-0 mt-1"
            />
          </div>
          <div>
            {errors?.socialMediaLinks?.twitter && (
              <p className="text-red-500 text-xs translate-y-2 bg-white max-w-fit">
                {errors?.socialMediaLinks?.twitter.message}
              </p>
            )}
            <Input
              {...register("socialMediaLinks.twitter")}
              id="twitter"
              type="text"
              placeholder="twitter"
              className="m-0 mt-1"
            />
          </div>
          <div>
            {errors?.socialMediaLinks?.linkedin && (
              <p className="text-red-500 text-xs translate-y-2 bg-white max-w-fit">
                {errors?.socialMediaLinks?.linkedin.message}
              </p>
            )}
            <Input
              {...register("socialMediaLinks.linkedin")}
              id="linkedin"
              type="text"
              placeholder="linkedin"
              className="m-0 mt-1"
            />
          </div>
          <div>
            {errors?.socialMediaLinks?.youtube && (
              <p className="text-red-500 text-xs translate-y-2 bg-white max-w-fit">
                {errors?.socialMediaLinks?.youtube.message}
              </p>
            )}
            <Input
              {...register("socialMediaLinks.youtube")}
              id="youtube"
              type="text"
              placeholder="youtube"
              className="m-0 mt-1"
            />
          </div>
        </div>
      </div>
      {/* <div className="space-y-2">
        <Label className="text-sm font-medium">
          Promotional Video Upload
          <p className="text-green-400 font-semibold">
            {percentUploaded.toFixed(2) === "0.00" ||
            percentUploaded.toFixed(2) === "100.00"
              ? null
              : `Uploading file ${percentUploaded.toFixed(2)} %`}
          </p>
          {errors?.promotionalVideoUpload && (
            <p className="text-red-500 text-xs">
              {errors.promotionalVideoUpload.message}
            </p>
          )}
        </Label>
        <Input
          ref={inputRef}
          id="promotionalVideoUpload"
          type="file"
          className="m-0 mt-1"
        />
        <Button
          size="sm"
          type="button"
          disabled={isUploading}
          onClick={uploadVideo}
        >
          Upload
        </Button>
      </div> */}
      <div className="mt-2">
        <Label className="text-sm font-medium">
          Image Upload
          {errors?.images && errors.images && (
            <p className="text-red-500 text-xs">{errors.images.message}</p>
          )}
        </Label>
        <Input
          onChange={(e) =>
            setValue("images", e.target.files && e.target.files[0])
          }
          id="images"
          type="file"
          className="m-0 mt-1"
        />
      </div>
    </div>
  );
};
export default Step7;

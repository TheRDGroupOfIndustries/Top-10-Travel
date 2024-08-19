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

const Step7 = ({ register, errors }: { register: any; errors: any }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [publicId, setPublicId] = useState("");
  const session = useSession();
  const uploadVideo = async () => {
    if (!session.data) return;
    const file = inputRef.current?.files && inputRef.current.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    if (file.type !== "video/mp4") {
      toast.error("Invalid file type");
      return;
    }

    try {
      // Get a signature using server action
      setIsUploading(true);
      const { timestamp, signature } = await getSignature();
      console.log(timestamp, signature);

      // Upload to Cloudinary using the signature
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("folder", "top10travels");
      formData.append("public_id", `agency-${session.data.user.id}-video`);

      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
      const sr = await axios.post(endpoint, formData);
      const data = sr.data;
      console.log(data);

      // Write to the database using server actions
      const res = await saveToDatabase({
        version: data?.version,
        signature: data?.signature,
        public_id: data?.public_id,
      });

      if (res?.success) toast.success(res.success);
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
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
      <div>
        <Label className="text-sm font-medium">
          Promotional Video Upload
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
      </div>
    </>
  );
};
export default Step7;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  uploadCompanyDashboardImage,
  uploadFileAction,
} from "@/core/server/cloudinary/cloudinary";
import useMutation from "@/hooks/useMutation";
import { getValidUrl } from "@/lib/utils";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const UploadCompanyImage = ({ image }: { image: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending } = useMutation(uploadCompanyDashboardImage);
  const [isChanging, setIsChanging] = useState(false);
  const router = useRouter();
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    if (!["image/jpeg", "image/png"].includes(files[0]?.type)) {
      setFile(null);
      toast.error("Only image is allowed.");
      return;
    }
    setFile(files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    const data = new FormData();
    data.set("file", file);
    const { error, uploadedUrl } = await mutate(data);
    if (error || !uploadedUrl) {
      toast.error(error);
      return;
    }
    setIsChanging(false);
    router.refresh();
  };

  return (
    <div className="flex items-center">
      {isChanging ? (
        <>
          <Input
            onChange={handleFile}
            type="file"
            name="file"
            placeholder="Upload Image"
          />
          <Button
            className="mb-2"
            size="sm"
            onClick={handleSubmit}
            disabled={isPending}
          >
            Upload
          </Button>
        </>
      ) : (
        <div
          onClick={() => setIsChanging(true)}
          className="group w-[300px] h-[200px] rounded-lg overflow-hidden relative hover:cursor-pointer "
        >
          <div className="absolute z-20 inset-0 flex items-center justify-center translate-y-full transition-transform group-hover:translate-y-0">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src={getValidUrl(image)}
              alt="Company Image"
              width={500}
              height={500}
              className="w-full h-full object-cover aspect-auto transition-transform group-hover:scale-95 group-hover:brightness-50 "
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default UploadCompanyImage;

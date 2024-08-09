import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadFileAction } from "@/core/server/cloudinary/cloudinary";
import useMutation from "@/hooks/useMutation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const UploadImage = ({
  handleChange,
}: {
  handleChange: (url: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending } = useMutation(uploadFileAction);
  
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const data = new FormData();
    data.set("file", file);
    const { error, uploadedUrl } = await mutate(data);
    if (error || !uploadedUrl) {
      toast.error(error);
      return;
    }
    handleChange(uploadedUrl);
  };

  return (
    <div>
      {/* <strong className="text-red-500">{.error}</strong> */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center"
      >
        <Input
          onChange={handleFile}
          type="file"
          name="file"
          placeholder="Upload Image"
        />
        <Button
          className="mb-2"
          size="sm"
          disabled={isPending}
          type="submit"
        >
          Upload
        </Button>
      </form>
    </div>
  );
};
export default UploadImage;

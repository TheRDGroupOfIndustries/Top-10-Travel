import { cn, getValidUrl } from "@/lib/utils";
import { Plus, Trash, Upload } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useMutation from "@/hooks/useMutation";
import { toast } from "sonner";
import { Input } from "../../ui/input";
import Image from "next/image";
import {
  deleteAgencyImage,
  uploadAgencyImages,
} from "@/core/server/cloudinary/cloudinary";

const UploadAgencyImagesCard = ({
  images,
  companyId,
}: {
  images: string[];
  companyId: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { mutate, isPending } = useMutation(deleteAgencyImage);
  const handleDelete = async (image: string) => {
    const { success, error } = await mutate({
      url: image,
      agencyId: companyId,
    });
    if (success) {
      setIsVisible(false);
      toast.success(success);
    } else toast.error(error);
  };

  return (
    <Card className="border-none bg-[#F3F3F3]">
      <CardHeader>
        <CardTitle>
          <span className="text-mainColor">Images</span>
          <Dialog open={isVisible} onOpenChange={setIsVisible}>
            <DialogTrigger asChild>
              <Button
                className={cn("ml-4", images.length === 4 ? "hidden" : "")}
                variant="outline"
                size="icon"
              >
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a Image</DialogTitle>
                <DialogDescription>
                  Upload a image to add to your images.
                </DialogDescription>
              </DialogHeader>
              <UploadAgencyImages companyId={companyId} />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6 flex-wrap items-center justify-center md:justify-start">
          {images.map((image, ind) => (
            <div
              key={`${image}-${ind}`}
              className="w-[240px] h-[140px] overflow-hidden rounded-lg relative border border-black"
            >
              <div className="absolute top-0 right-0">
                <Button
                  onClick={() => handleDelete(image)}
                  disabled={isPending}
                  className="h-8 w-8"
                  size="icon"
                  variant="destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                src={image}
                alt="Company Image"
                className="w-full aspect-auto object-cover"
                width={240}
                height={100}
              />
            </div>
          ))}
          {images.length === 0 && <p>No Images add one to see.</p>}
        </div>
      </CardContent>
    </Card>
  );
};

const UploadAgencyImages = ({ companyId }: { companyId: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending } = useMutation(uploadAgencyImages);
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
    const { error, success } = await mutate({
      form: data,
      agencyId: companyId,
    });
    if (error || !success) {
      toast.error(error);
      return;
    }
    toast.success("Image uploaded successfully.");
  };

  return (
    <div className="flex items-center">
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
        disabled={isPending || !file}
      >
        Upload
      </Button>
    </div>
  );
};

export default UploadAgencyImagesCard;

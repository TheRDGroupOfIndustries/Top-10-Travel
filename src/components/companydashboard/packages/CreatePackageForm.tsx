"use client";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import useMutation from "@/hooks/useMutation";
import { toast } from "sonner";
import { createPackageAction } from "@/core/server/actions/package/createPackage";
import { Package } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type FormType = Omit<
  Package,
  "id" | "companyId" | "createdAt" | "price" | "image"
> & {
  price: string;
};

export default function CreatePackageForm() {
  const [form, setForm] = useState<FormType>({
    amenities: [],
    desc: "",
    duration: "",
    price: "",
    title: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    if (!["image/jpeg", "image/png", "image/svg"].includes(files[0]?.type)) {
      setFile(null);
      toast.error("Only image is allowed.");
      return;
    }
    setFile(files[0]);
  };
  const { mutate, isPending } = useMutation(createPackageAction);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (!file) return;
    const data = new FormData();
    data.set("file", file);

    const { success, error } = await mutate({
      values: {
        ...form,
        price: parseFloat(form.price),
      },
      form: data,
    });

    if (success) {
      toast.success(success);
      router.push("/company/packages");
    } else toast.error(error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Card className="w-full max-w-md mt-6 bg-[7F7F7F] border-none ">
      <CardHeader>
        <CardTitle>
          Create Your <span className="text-[#FCAE1D]">Package</span>
        </CardTitle>
        <CardDescription>
          Create a package by filling the following form.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreate}>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="title">Title of package</Label>
              <Input
                required
                type="text"
                name="title"
                minLength={5}
                id="title"
                placeholder="Title of the package"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="desc">Description of package</Label>
              <Input
                required
                type="text"
                name="desc"
                minLength={50}
                id="desc"
                placeholder="Description of the package"
                value={form.desc}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="image">Image of package</Label>
              <Input
                required
                type="file"
                name="image"
                id="image"
                placeholder="Image of the package"
                onChange={handleFile}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="duration">Duration of package</Label>
              <Input
                required
                type="text"
                name="duration"
                minLength={5}
                id="duration"
                placeholder="2 days, 1 night ..."
                value={form.duration}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="price">Price of package</Label>
              <Input
                required
                type="number"
                min={0}
                step={0.01}
                name="price"
                id="price"
                placeholder="Price of the package"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="amenity">Amenities (comma to add)</Label>
              <div className="flex gap-2 flex-wrap">
                {form.amenities.map((amenity, ind) => (
                  <Badge
                    key={ind}
                    className="hover:cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        amenities: prev.amenities.filter((_, i) => i !== ind),
                      }));
                    }}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
              <Input
                type="text"
                name="amenity"
                className={cn(form.amenities.length >= 15 ? "hidden" : "")}
                id="amenity"
                placeholder="Free wifi, free coffee etc..."
                onChange={(e) => {
                  if (form.amenities.length >= 15) {
                    e.preventDefault();
                    return;
                  }
                  const value = e.target.value,
                    char = value[value.length - 1];
                  if (
                    char === "," &&
                    value.slice(0, value.length - 1).trim() !== ""
                  ) {
                    e.preventDefault();
                    setForm((prev) => ({
                      ...prev,
                      amenities: [
                        ...prev.amenities,
                        value.slice(0, value.length - 1).trim(),
                      ],
                    }));
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="mt-4 bg-[#fcaf1e] hover:bg-[#fcaf1e]/80"
          >
            {isPending ? "Creating..." : "Create Package"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

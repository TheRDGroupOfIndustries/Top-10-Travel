"use client";
import * as React from "react";

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
import { UploadButton } from "@/resources/uploadthing";
import Image from "next/image";

type FormType = Omit<Package, "id" | "companyId" | "createdAt" | "price"> & {
  price: string;
};

export default function CreatePackageForm() {
  const [isImage,setImage] = React.useState("");
  const [form, setForm] = React.useState<FormType>({
    amenities: [],
    desc: "",
    duration: "",
    image: "",
    price: "",
    title: "",
  });
  const { mutate, isPending } = useMutation(createPackageAction);
  const handleCreate = async (e: any) => {
    e.preventDefault();
    const { success, error } = await mutate({
      ...form,
      price: parseFloat(form.price),
    });
    if (success) toast.success(success);
    else toast.error(error);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Your Package</CardTitle>
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
            
         {
          isImage!="" ? (
          <Image
          src={isImage}
          height={200}
          width={200}
          alt="package image"
          
          />
          ):(
            <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              console.log("Files: ", res);
              if (res.length > 0) {
                handleChange({
                  target: {
                    name: "image",
                    value: res[0].url,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
                setImage(res[0].url)
                console.log("Image URL stored:", res[0].url);
              }
            }}
          />
          )
         }          
       
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
            className="mt-4"
          >
            {isPending ? "Creating..." : "Create Package"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

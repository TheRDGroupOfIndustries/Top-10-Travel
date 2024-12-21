"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { set } from "zod";

const AddBadge = () => {
  const [submitting, setSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("Submit");
  const handleUpdate = async (e: any) => {
    setSubmitting(true);
    setMessage("Submitting...");

    if (!selectedImage) {
      alert("Please select an image");
      setSubmitting(false);
      return;
    }

    if (!name) {
      alert("Please enter a name");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", selectedImage as File);

    try {
      const response = await fetch("/api/badges/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Add Badge successfully!");
      } else {
        setMessage("Failed to Add Badge");
      }
    } catch (error) {
      setMessage("Error Addn Badge");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
    }
  };

  return (
    <Card className="w-full overflow-auto max-h-[90vh]">
      <CardHeader>
        <CardTitle>Add Badge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 ">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              defaultValue={"tag"}
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              name="name"
              placeholder="Enter name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium">
              Tag
            </label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <Button
            className="bg-mainColor w-full hover:bg-mainColor/80"
            disabled={submitting}
            onClick={handleUpdate}
          >
            {message}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddBadge;

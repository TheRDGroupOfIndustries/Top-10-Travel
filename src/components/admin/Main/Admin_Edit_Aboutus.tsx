"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useState } from "react";
import image from "/public/image1.jpg";
import { set } from "zod";

interface AboutContent {
  title: string;
  content: string;
}

const AdminEditAboutus = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");


    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }


    try {
      const response = await fetch("/api/about", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Content updated successfully!");
      } else {
        setMessage("Failed to update content");
      }
    } catch (error) {
      setMessage("Error saving content");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/about");
      const data = await response.json();

      setTitle(data.title);
      setContent(data.content);
      setPreview(data.imageURL)
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      // setUploadMessage('');
    }
  };

  return (
    <Card className="bg-[#f3f3f3]">
      <CardHeader>
        <CardTitle className="lg:text-3xl md:text-2xl text-xl font-semibold">
          <p>
            About <span className="text-mainColor">US</span>
          </p>
          <p className="md:text-base text-sm mt-1">
            This is the About Us page.
          </p>
        </CardTitle>
      </CardHeader>
      {/* <CardContent>Content</CardContent> */}
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Card
            title="Click to change"
            className="relative w-full h-72 cursor-pointer"
          >
            <Image
              alt="Banner image"
              src={preview}
              className="w-full h-full rounded-lg object-cover bg-center"
              width={1080}
              height={1080}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute opacity-0 top-0 left-0 cursor-pointer h-full w-full"
            />
          </Card>
        </CardContent>

        <CardContent>
          <Label>Title</Label>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className=" max-w-sm focus-visible:ring-none focus-visible:ring-0 bg-[#fbfbfb]"
          />
        </CardContent>
        <CardContent>
          <Label>Description</Label>
          <Textarea
            placeholder="Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className=" min-h-32 focus-visible:ring-none focus-visible:ring-0 bg-[#fbfbfb]"
          />
        </CardContent>
        <CardContent>
          {message && (
            <div
              className={`p-4 rounded ${
                message.includes("successfully") ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {message}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSaving}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default AdminEditAboutus;

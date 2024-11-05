"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import Image from "next/image";
import image from '/public/image1.jpg'

const AdminTermsAndConditions = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const editorRef = useRef<EasyMDE | null>(null); 

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("Saving...");


    const value = editorRef.current?.value();

    console.log("value", value);

    // console.log("saving", content);


    const formData = new FormData();

    formData.append("content", value as string);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch("/api/terms", {
        method: "PUT",
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

  useEffect(() => {
    // Initialize EasyMDE when the component mounts
    if (!editorRef.current) {
      editorRef.current = new EasyMDE({
        element: document.getElementById("markdown-editor") as HTMLElement,
        initialValue: content,
        spellChecker: false,
        toolbar: [
          "bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "preview"
        ],
        status: false,
        autofocus: true,
        placeholder: "Start typing in markdown...",
        previewRender: (plainText) => {
          // This ensures the preview uses your custom markdown-body styles
          return `<div class="markdown-body">${(editorRef.current as any).markdown(plainText)}</div>`;
        },
      });

      // Attach the change event listener to the CodeMirror instance
      editorRef.current.codemirror.on("change", () => {
        const value = editorRef.current?.value();
        // setContent(value || "");
      });
    }

    // Clean up the editor instance when the component unmounts
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
        editorRef.current = null;
      }
    };
  }, [content]);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/terms");
      const data = await response.json();
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
            Terms <span className="text-mainColor">{` and `}</span>
            Conditions
          </p>
          <p className="md:text-base text-sm mt-1">
            This is the terms and conditions page.
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>Content</CardContent>
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
              className="absolute top-0 left-0 cursor-pointer h-full w-full"
            />
          </Card>
        </CardContent>
        <CardContent>
          <textarea
            id="markdown-editor"
            defaultValue={content}
            style={{ display: "none" }} 
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

export default AdminTermsAndConditions;

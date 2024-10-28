"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

const AdminTermsAndConditions = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const editorRef = useRef<EasyMDE | null>(null); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("Saving...");

    console.log("form data", content);

    try {
      const response = await fetch("/api/terms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
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
        setContent(value || "");
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
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
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

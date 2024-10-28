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
import { useEffect, useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    console.log("form data", title, content);

    try {
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
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
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/about')
      const data = await response.json()

      setTitle(data.title)
      setContent(data.content)
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
      <CardContent>Content</CardContent>
      <form onSubmit={handleSubmit}>
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

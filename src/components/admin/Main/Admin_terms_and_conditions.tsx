"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const AdminTermsAndConditions = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("done");

    console.log("form data",  content);

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
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/terms')
      const data = await response.json()

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
          <Textarea
            placeholder="Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className=" min-h-32 h-60 focus-visible:ring-none focus-visible:ring-0 bg-[#fbfbfb]"
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

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
import { createRequestAction } from "@/core/server/actions/requests/createRequest";
import { toast } from "sonner";
import { createHelpDeskAction } from "@/core/server/actions/helpdesk/createHelpdesk";

export default function HelpDeskForm() {
  const [title, setTitle] = React.useState("");
  const { mutate, isPending } = useMutation(createHelpDeskAction);
  const handleSend = async () => {
    if (title.length < 20) {
      toast.error("Title must be at least 20 characters.");
      return;
    }
    const { success, error } = await mutate({ title });
    if (success) toast.success(success);
    else toast.error(error);
  };
  return (
    <Card className="border-none bg-[#F3F3F3]">
      <CardHeader>
        <CardTitle>Create a <span className="text-[#FCAE1D]">Helpdesk</span></CardTitle>
        <CardDescription>
          Here you can create a helpdesk for the admin regarding your queries.
        </CardDescription>
      </CardHeader>
      <CardContent >
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Textarea
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of your helpdesk"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          disabled={isPending}
          onClick={handleSend}
          className="bg-[#FCAE1D]"
        >
          {isPending ? "Creating..." : "Create Helpdesk"}
        </Button>
      </CardFooter>
    </Card>
  );
}

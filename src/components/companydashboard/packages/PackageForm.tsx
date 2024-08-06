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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useMutation from "@/hooks/useMutation";
import { createRequestAction } from "@/core/server/actions/requests/createRequest";
import { toast } from "sonner";

export default function RequestForm() {
  const [message, setMessage] = React.useState("");
  const { mutate, isPending } = useMutation(createRequestAction);
  const handleSend = async () => {
    if (message.length < 20) {
      toast.error("Message must be at least 20 characters.");
      return;
    }
    const { success, error } = await mutate({ message });
    if (success) toast.success(success);
    else toast.error(error);
  };
  return (
      <Card className="">
        <CardHeader>
          <CardTitle>Create Your Request</CardTitle>
          <CardDescription>
            Here you can create a request for the admin to change your priority
            etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message of your request"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            disabled={isPending}
            onClick={handleSend}
          >
            {isPending ? "Sending..." : "Send Request"}
          </Button>
        </CardFooter>
      </Card>
    
  );
}

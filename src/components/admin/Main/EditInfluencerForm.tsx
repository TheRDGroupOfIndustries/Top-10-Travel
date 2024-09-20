"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMutation from "@/hooks/useMutation";

import { toast } from "sonner";

import { Textarea } from "@/components/ui/textarea";
import { editInfluencerAdmin } from "@/core/server/actions/admin/editInfluencerAdmin";
import { Company } from "./Admin_Influencer_Listing";

const EditInfluencerForm = ({ company }: { company: Company }) => {
  const { mutate, isPending } = useMutation(editInfluencerAdmin);
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value as string;
    const priority = Number(e.target.priority.value);
    const state_priority = Number(e.target.state_priority.value);
    const isCertified = e.target.isCertified.value === "true";
    const speciality = e.target.speciality.value as string;

    const { success, error } = await mutate({
      data: {
        state_priority,
        isCertified,
        name,
        priority,
        speciality,
      },
      id: company.id,
      // @ts-expect-error
      type: company.type,
    });
    if (success) toast.success(success);
    else toast.error(error);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Influencer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              defaultValue={company.name}
              id="name"
              name="name"
              placeholder="Enter name"
              minLength={10}
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium">
              Priority
            </label>
            <Input
              defaultValue={company.priority}
              id="priority"
              name="priority"
              type="number"
              min={0}
              max={1000}
              placeholder="Enter priority"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="speciality" className="text-sm font-medium">
              Speciality
            </label>
            <Input
              defaultValue={company.speciality || ""}
              id="speciality"
              name="speciality"
              placeholder="Enter speciality"
              minLength={3}
              maxLength={50}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="state_priority" className="text-sm font-medium">
              Priority(city)
            </label>
            <Input
              defaultValue={company.state_priority}
              id="state_priority"
              name="state_priority"
              type="number"
              min={0}
              max={1000}
              required
              placeholder="Enter priority(city)"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="isCertified" className="text-sm font-medium">
              Is Certified
            </label>
            <Select
              defaultValue={String(company.isCertified)}
              name="isCertified"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select is certified" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="bg-mainColor w-full hover:bg-mainColor/80"
            disabled={isPending}
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditInfluencerForm;

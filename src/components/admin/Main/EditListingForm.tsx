"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMutation from "@/hooks/useMutation";

import { toast } from "sonner";

import { Company } from "./Admin_Package_listing";
import { editListingAdmin } from "@/core/server/actions/admin/editListingAdmin";
import { Textarea } from "@/components/ui/textarea";

const EditListingForm = ({ company }: { company: Company }) => {
  const { mutate, isPending } = useMutation(editListingAdmin);
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value as string;
    const priority = Number(e.target.priority.value);
    const methodology = e.target.methodology.value;
    const city_priority = Number(e.target.city_priority.value);
    const isCertified = e.target.isCertified.value === "true";

    const { success, error } = await mutate({
      data: {
        city_priority,
        isCertified,
        methodology,
        name,
        priority,
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
        <CardTitle>Edit {company.type} Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleUpdate}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium"
            >
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
            <label
              htmlFor="priority"
              className="text-sm font-medium"
            >
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
            <label
              htmlFor="methodology"
              className="text-sm font-medium"
            >
              Methodology
            </label>
            <Textarea
              defaultValue={company.methodology || ""}
              id="methodology"
              name="methodology"
              placeholder="Enter methodology"
              rows={3}
              minLength={10}
              maxLength={500}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="city_priority"
              className="text-sm font-medium"
            >
              Priority(city)
            </label>
            <Input
              defaultValue={company.city_priority}
              id="city_priority"
              name="city_priority"
              type="number"
              min={0}
              max={1000}
              required
              placeholder="Enter priority(city)"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="isCertified"
              className="text-sm font-medium"
            >
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
            className="bg-[#fcaf1e] w-full hover:bg-[#fcaf1e]/80"
            disabled={isPending}
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditListingForm;

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
import { editListingAdmin } from "@/core/server/actions/admin/editListingAdmin";
import Image from "next/image";
import { useState } from "react";
import { Company } from "./Admin_Package_listing";

const EditListingForm = ({ company }: { company: Company }) => {
  const { mutate, isPending } = useMutation(editListingAdmin);

  // List of tags that already exist
  const [tagAlreadySelected, setTagAlreadySelected] = useState(company.tags);

  const handleTagSelect = (tag: any) => {
    if (!tagAlreadySelected.map((tag) => tag.id).includes(tag.id)) {
      setTagAlreadySelected([...tagAlreadySelected, tag]);
    } else {
      toast.error("Tag already selected");
    }
  };

  const handleTagRemove = (tagid: string) => {
    setTagAlreadySelected(tagAlreadySelected.filter((t) => t.id !== tagid));
  };

  const handleUpdate = async (e: any) => {
    // company.type 
    e.preventDefault();
    const name = e.target.name.value as string;
    const priority = company.type === "Dmc" ? Number(e.target.priority.value) : 0;
    const methodology = e.target.methodology.value;
    const city_priority = company.type !== "Dmc" ? Number(e.target.city_priority.value) : 0;
    const isCertified = e.target.isCertified.value === "true";
    const tags = tagAlreadySelected.map((tag) => tag.id);

    const { success, error } = await mutate({
      data: {
        city_priority,
        isCertified,
        methodology,
        name,
        priority,
        tags,
        city: company.city,
        country: company.country,
      },
      id: company.id,
      // @ts-expect-error
      type: company.type,
    });
    if (success) toast.success(success);
    else toast.error(error);
  };
  return (
    <Card className="w-full overflow-auto max-h-[90vh]">
      <CardHeader>
        <CardTitle>Edit {company.type} Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdate} className="space-y-4 ">
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
          {company.type === "Dmc" && (
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
          )}
          <div className="space-y-2">
            <label htmlFor="methodology" className="text-sm font-medium">
              Small Description
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
          {company.type !== "Dmc" && (
            <div className="space-y-2">
              <label htmlFor="city_priority" className="text-sm font-medium">
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
          )}
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

          <div className="space-y-2">
            <label htmlFor="isCertified" className="text-sm font-medium">
              Tags
            </label>
            <Card className="flex h-[40px] w-full overflow-auto flex-nowrap flex-row items-center gap-4">
              {tagAlreadySelected.map((tag) => (
                <Image
                  onClick={() => handleTagRemove(tag.id)}
                  key={tag.id}
                  src={tag.url}
                  alt=""
                  height={15}
                  width={80}
                  className="h-[25px] w-fit"
                />
              ))}
            </Card>
            <label htmlFor="isCertified" className="text-sm font-medium">
              Select tags
            </label>
            <Card className="flex h-[40px] w-full overflow-auto flex-nowrap flex-row items-center gap-4">
              {company.allTags.map((tag) => (
                <Image
                  onClick={() => handleTagSelect(tag)}
                  key={tag.id}
                  src={tag.url}
                  alt=""
                  height={15}
                  width={80}
                  className="h-[25px] w-fit "
                />
              ))}
            </Card>
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

export default EditListingForm;

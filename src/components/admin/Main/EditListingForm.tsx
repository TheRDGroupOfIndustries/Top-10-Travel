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
import { $Enums } from "@prisma/client";
import { toast } from "sonner";
import { editCompanyActionAdmin } from "@/core/server/actions/company/editCompany";
import { Company } from "./Admin_Package_listing";

const EditListingForm = ({ company }: { company: Company }) => {
  const { mutate, isPending } = useMutation(editCompanyActionAdmin);
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const legalName = e.target.legalName.value as string;
    const priority = Number(e.target.priority.value);
    const state_priority = Number(e.target.state_priority.value);
    const isCertified = e.target.isCertified.value === "true";
    const isSuspended = e.target.isSuspended.value === "true";
    const companyRole = e.target.companyRole.value as $Enums.CompanyRole;
    console.log(
      legalName,
      priority,
      state_priority,
      isCertified,
      isSuspended,
      companyRole
    );
    const { success, error } = await mutate({
      id: company.id,
      companyRole,
      state_priority,
      isCertified,
      isSuspended,
      legalName,
      priority,
    });
    if (success) toast.success(success);
    else toast.error(error);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleUpdate}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="legalName"
              className="text-sm font-medium"
            >
              LegalName
            </label>
            <Input
              defaultValue={company.legalName}
              id="legalName"
              name="legalName"
              placeholder="Enter legalName"
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
              htmlFor="state_priority"
              className="text-sm font-medium"
            >
              Priority(city)
            </label>
            <Input
              defaultValue={company.state_priority}
              id="state_priority"
              name="state_priority"
              type="number"
              min={0}
              max={1000}
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
          <div className="space-y-2">
            <label
              htmlFor="isSuspended"
              className="text-sm font-medium"
            >
              Is Suspended
            </label>
            <Select
              defaultValue={String(company.isSuspended)}
              name="isSuspended"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select is suspended" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="role"
              className="text-sm font-medium"
            >
              Role
            </label>
            <Select
              defaultValue={company.companyRole}
              name="companyRole"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AGENCY">Agency</SelectItem>
                <SelectItem value="DMC">Dmc</SelectItem>
                <SelectItem value="HOTEL">Hotel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full"
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

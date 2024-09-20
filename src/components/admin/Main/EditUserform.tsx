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
import updateUserAction from "@/core/server/actions/users/updateUser";
import { $Enums, User } from "@prisma/client";
import { toast } from "sonner";

const EditUserForm = ({ user }: { user: User }) => {
  const { mutate, isPending } = useMutation(updateUserAction);
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const username = e.target.username.value as string;
    const email = e.target.email.value as string;
    const role = e.target.role.value as $Enums.Role;
    const { success, error } = await mutate({
      username,
      email,
      role,
      id: user.id,
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
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              defaultValue={user.username}
              id="username"
              name="username"
              placeholder="Enter username"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              defaultValue={user.email}
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <Select defaultValue={user.role} name="role">
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="USER">User</SelectItem>
                {/* <SelectItem value="Influencer">Influencer</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          {/* <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <Button
            type="submit"
            disabled={isPending}
            className="bg-mainColor w-full hover:bg-mainColor/80"
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditUserForm;

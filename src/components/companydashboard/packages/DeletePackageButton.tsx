"use client";

import { Button } from "@/components/ui/button";
import { deletePackageOwn } from "@/core/server/actions/package/editPackage";
import useMutation from "@/hooks/useMutation";
import { toast } from "sonner";

const DeletePackageButton = ({ packageId }: { packageId: string }) => {
  const { isPending, mutate } = useMutation(deletePackageOwn);
  const handleDelete = async () => {
    const { success, error } = await mutate(packageId);
    if (success) toast.success(success);
    else toast.error(error);
  };
  return (
    <Button
      onClick={handleDelete}
      disabled={isPending}
      variant="destructive"
    >
      {isPending ? "Deleting..." : "Delete Package"}
    </Button>
  );
};
export default DeletePackageButton;

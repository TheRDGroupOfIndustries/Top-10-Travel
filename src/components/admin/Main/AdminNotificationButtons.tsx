"use client";
import { Button } from "@/components/ui/button";
import { editRequestAdmin } from "@/core/server/actions/requests/editRequest";
import useMutation from "@/hooks/useMutation";
import { toast } from "sonner";

const AdminNotificationButtons = ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const { mutate: reject, isPending: pendingReject } =
    useMutation(editRequestAdmin);
  const { mutate: accept, isPending: pendingAccept } =
    useMutation(editRequestAdmin);
  const acceptReq = async () => {
    const { success, error } = await accept({
      values: { id, status: "ACCEPTED" },
      id: userId,
    });
    if (success) toast.success(success);
    else toast.error(error);
  };
  const rejectReq = async () => {
    const { success, error } = await reject({
      values: { id, status: "REJECTED" },
      id: userId,
    });
    if (success) toast.success(success);
    else toast.error(error);
  };
  return (
    <div className="space-x-2">
      <Button
        disabled={pendingAccept}
        onClick={acceptReq}
        size="sm"
        className="bg-mainColor hover:bg-[#d28c09]"
      >
        Accept
      </Button>
      <Button
        disabled={pendingReject}
        onClick={rejectReq}
        variant="destructive"
        size="sm"
      >
        Reject
      </Button>
    </div>
  );
};
export default AdminNotificationButtons;

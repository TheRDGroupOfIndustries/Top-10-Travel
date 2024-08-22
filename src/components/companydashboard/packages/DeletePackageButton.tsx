// "use client";

// import { Button } from "@/components/ui/button";
// import { deletePackageOwn } from "@/core/server/actions/package/editPackage";
// import useMutation from "@/hooks/useMutation";
// import { Trash2, Loader2 } from "lucide-react";

// import { toast } from "sonner";

// const DeletePackageButton = ({ packageId }: { packageId: string }) => {
//   const { isPending, mutate } = useMutation(deletePackageOwn);
//   const handleDelete = async () => {
//     const { success, error } = await mutate(packageId);
//     if (success) toast.success(success);
//     else toast.error(error);
//   };
//   return (
//     <Button
//       size={"icon"}
//       onClick={handleDelete}
//       disabled={isPending}
//       variant="destructive"
//     >
//       {isPending ? (
//         <Loader2 className="h-4 w-4 animate-spin" />
//       ) : (
//         <Trash2 className="h-4 w-4" />
//       )}
//     </Button>
//   );
// };
// export default DeletePackageButton;

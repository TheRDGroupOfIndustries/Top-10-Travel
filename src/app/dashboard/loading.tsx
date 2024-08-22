import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full animate-pulse w-full flex justify-center items-center p-10">
      <div className="p-10">
        <Loader className="animate-spin h-10 w-10 textColor3" />
      </div>
    </div>
  );
}

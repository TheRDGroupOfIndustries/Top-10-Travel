import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen animate-pulse w-full flex justify-center items-center p-10">
      <div className="p-10">
        {/* <Loader className="animate-spin h-10 w-10 textColor3" /> */}
        <video
          id="loader"
          src="/travelLoader.mp4"
          autoPlay
          loop
          muted
          className="w-36 h-36"
        />
      </div>
    </div>
  );
}

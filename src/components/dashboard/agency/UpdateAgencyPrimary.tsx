import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MdOutlineCheckBox as Checked,
  MdOutlineCheckBoxOutlineBlank as Unchecked,
} from "react-icons/md";

const primaryServices = [
  "Corporate Travel",
  "Leisure Travel",
  "Group Tours",
  "Individual Travel Packages",
  "Adventure Travel",
  "Cruise Packages",
];

const UpdateAgencyPrimary = ({ data }: { data: string[] }) => {
  return (
    <Card className="border-none bg-[#F3F3F3] mt-4">
      <CardHeader className="text-2xl font-semibold">
        <div>
          <span className="text-[#FCAE1D]">Primary </span>
          Services
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {primaryServices.map((s) => (
              <span
                className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                key={s}
              >
                {data.includes(s) ? (
                  <Checked className="text-black text-xl" />
                ) : (
                  <Unchecked className="text-black text-xl" />
                )}
                {s}
              </span>
            ))}
          </div>
          <Input
            //   onChange={(e) => setPrimaryServices(e.target.value.split(","))}
            placeholder="Others comma separated"
            className="m-0 mt-1 w-fit"
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default UpdateAgencyPrimary;

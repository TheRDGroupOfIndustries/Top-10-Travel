import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  updatePrimaryAction,
  updateSpecialAction,
} from "@/core/server/actions/agency/services";
import useMutation from "@/hooks/useMutation";
import { useEffect, useMemo, useState } from "react";
import {
  MdOutlineCheckBox as Checked,
  MdOutlineCheckBoxOutlineBlank as Unchecked,
} from "react-icons/md";
import { toast } from "sonner";

const primaryServices = [
  "Corporate Travel",
  "Leisure Travel",
  "Group Tours",
  "Individual Travel Packages",
  "Adventure Travel",
  "Cruise Packages",
];

const specializedTravelTypes = [
  "Luxury Travel",
  "Budget Travel",
  "Eco friendly Travel",
  "Cultural Tours",
  "Religious Tours",
];

function arraysAreEqual(arr1: string[], arr2: string[]) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

const UpdateAgencyPrimary = ({
  primary,
  special,
  id,
}: {
  primary: string[];
  special: string[];
  id: string;
}) => {
  const [newPrimary, setNewPrimary] = useState<string[]>([]);
  const [newSpecial, setNewSpecial] = useState<string[]>([]);
  const hasPrimaryChanged = useMemo(
    () => !arraysAreEqual(newPrimary, primary),
    [newPrimary, primary]
  );
  const hasSpecialChanged = useMemo(
    () => !arraysAreEqual(newSpecial, special),
    [newSpecial, special]
  );
  const { mutate: primaryAction, isPending: isPendingPrimary } =
    useMutation(updatePrimaryAction);
  const { mutate: specialAction, isPending: isPendingSpecial } =
    useMutation(updateSpecialAction);

  useEffect(() => {
    setNewPrimary([...primary]);
  }, [primary]);

  useEffect(() => {
    setNewSpecial(special);
  }, [special]);
  const handleCheckPrimary = (value: string) => {
    setNewPrimary((prev) => [...prev, value]);
  };
  const handleUncheckPrimary = (value: string) => {
    setNewPrimary((prev) => prev.filter((v) => v !== value));
  };
  const handleCheckSpecial = (value: string) => {
    setNewSpecial((prev) => [...prev, value]);
  };
  const handleUncheckSpecial = (value: string) => {
    setNewSpecial((prev) => prev.filter((v) => v !== value));
  };

  return (
    <Card className="border-none bg-[#F3F3F3] mt-4">
      <CardContent className="flex flex-col gap-4 pt-6">
        <div>
          <div className="text-2xl font-semibold">
            <div>
              <span className="text-mainColor">Primary </span>
              Services
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {Array.from(new Set(primaryServices.concat(newPrimary))).map(
              (s) => (
                <span
                  className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                  key={s}
                >
                  {newPrimary.includes(s) ? (
                    <Checked
                      onClick={() => handleUncheckPrimary(s)}
                      className="text-black text-xl hover:cursor-pointer"
                    />
                  ) : (
                    <Unchecked
                      onClick={() => handleCheckPrimary(s)}
                      className="text-black text-xl hover:cursor-pointer"
                    />
                  )}
                  {s}
                </span>
              )
            )}
          </div>
          <div className="flex items-center gap-4">
            <form
              className="flex items-center gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                // @ts-expect-error
                const val = e.target.input.value;
                if (val.length < 3) {
                  toast.error("It must be atleast 3 characters.");
                  return;
                }
                setNewPrimary((prev) => [...prev, val]);
                e.currentTarget.reset();
              }}
            >
              <Input
                name="input"
                required
                placeholder="Others Primary services"
                className="m-0 mt-1 w-fit"
              />
              <Button
                size="sm"
                className="bg-mainColor hover:bg-mainColor/80"
                type="submit"
              >
                Add
              </Button>
            </form>
            <Button
              size="sm"
              className="ml-auto bg-mainColor hover:bg-mainColor/80"
              disabled={!hasPrimaryChanged || isPendingPrimary}
              onClick={async (e) => {
                const { success, error } = await primaryAction({
                  value: newPrimary,
                  id,
                });
                if (success) toast.success(success);
                else toast.error(error);
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <div>
          <div className="text-2xl font-semibold">
            <div>
              <span className="text-mainColor">Specialized </span>
              Travel Types
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {Array.from(new Set(specializedTravelTypes.concat(newSpecial))).map(
              (s) => (
                <span
                  className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                  key={s}
                >
                  {newSpecial.includes(s) ? (
                    <Checked
                      onClick={() => handleUncheckSpecial(s)}
                      className="text-black text-xl hover:cursor-pointer"
                    />
                  ) : (
                    <Unchecked
                      onClick={() => handleCheckSpecial(s)}
                      className="text-black text-xl hover:cursor-pointer"
                    />
                  )}
                  {s}
                </span>
              )
            )}
          </div>
          <div className="flex items-center gap-4">
            <form
              className="flex items-center gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                // @ts-expect-error
                const val = e.target.input.value;
                if (val.length < 3) {
                  toast.error("It must be atleast 3 characters.");
                  return;
                }
                setNewSpecial((prev) => [...prev, val]);
                e.currentTarget.reset();
              }}
            >
              <Input
                name="input"
                required
                placeholder="Others specialized Travel Types"
                className="m-0 mt-1 w-fit"
              />
              <Button
                size="sm"
                type="submit"
                className="bg-mainColor hover:bg-mainColor/80"
              >
                Add
              </Button>
            </form>
            <Button
              size="sm"
              className="ml-auto bg-mainColor hover:bg-mainColor/80"
              disabled={isPendingSpecial || !hasSpecialChanged}
              onClick={async (e) => {
                const { success, error } = await specialAction({
                  value: newPrimary,
                  id,
                });
                if (success) toast.success(success);
                else toast.error(error);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default UpdateAgencyPrimary;

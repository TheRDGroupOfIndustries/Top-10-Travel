import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  ClientReferenceSchema,
  PastProjectSchema,
} from "../agency/agencySchema";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RxCross2 } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { FaPlus } from "react-icons/fa6";
import { KeyPersonnel, PastProject } from "@prisma/client";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import useMutation from "@/hooks/useMutation";
import { deletePastProject } from "@/core/server/actions/dashboard/deletePastProject";
import { toast } from "sonner";
import { createPastProject } from "@/core/server/actions/dashboard/createPastProject";
import { deleteKeyPersonAction } from "@/core/server/actions/dashboard/deleteKeyPerson";
import { createKeyPersonAction } from "@/core/server/actions/dashboard/createKeyPerson";

type PastPro = Pick<
  KeyPersonnel,
  "name" | "position" | "specialization" | "yearsOfExperience" | "id"
>;
type Info =
  | { type: "Agency"; agencyId: string }
  | { type: "Dmc"; dmcId: string };

const InitProject = {
  name: "",
  position: "",
  specialization: "",
  yearsOfExperience: 0,
  id: "",
};

const PastProjectInput = ({
  remove,
  ind,
  form,
  info,
}: {
  remove: (ind: number) => void;
  ind: number;
  form: PastPro;
  info: Info;
}) => {
  const { mutate: deleteKeyPerson, isPending: isPendingDelete } = useMutation(
    deleteKeyPersonAction
  );
  const { mutate, isPending } = useMutation(createKeyPersonAction);
  const [isEditing, setIsEditing] = useState(form.id==="");

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const specialization = formData.get("specialization") as string;
    const yearsOfExperience = parseInt(
      formData.get("yearsOfExperience") as string
    );
    const { success, error } = await mutate({
      data: { name, position, specialization, yearsOfExperience },
      id:form.id===""?undefined:form.id,
      agencyId: info.type === "Agency" ? info.agencyId : undefined,
      dmcId: info.type === "Dmc" ? info.dmcId : undefined,
    });
    if (success) toast.success(success);
    else toast.error(error);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(new FormData(e.currentTarget));
      }}
      className="relative"
    >
      <Button
        size="icon"
        type="button"
        variant="destructive"
        className="h-7 w-7 text-xl absolute -left-8 text-white"
        disabled={isPendingDelete}
        onClick={async () => {
          if (form.id === "") {
            remove(ind);
            return;
          }
          const { success, error } = await deleteKeyPerson({
            id: form.id,
            agencyId: info.type === "Agency" ? info.agencyId : undefined,
            dmcId: info.type === "Dmc" ? info.dmcId : undefined,
          });
          if (success) {
            toast.success(success);
            setIsEditing(false);
          }
          else toast.error(error);
        }}
      >
        <RxCross2 />
      </Button>
      <div className="">
        <Label htmlFor="name">Name of Person</Label>
        <Input
          autoFocus={form.id === ""}
          disabled={!isEditing}
          type="text"
          name="name"
          placeholder="Name of person"
          defaultValue={form.name}
          className="m-0 mt-1"
          required
          minLength={3}
          maxLength={50}
        />
      </div>
      <div className="">
        <Label htmlFor="position">Position</Label>

        <Input
          name="position"
          disabled={!isEditing}
          type="text"
          placeholder="Position"
          defaultValue={form.position}
          className="m-0 mt-1"
          required
          minLength={3}
          maxLength={50}
        />
      </div>
      <div className="">
        <Label htmlFor="specialization">Specispecialization</Label>

        <Textarea
          disabled={!isEditing}
          name="specialization"
          placeholder="Person's Specispecialization"
          defaultValue={form.specialization}
          className="m-0 mt-1"
          required
          minLength={10}
          maxLength={250}
        />
      </div>
      <div className="">
        <Label htmlFor="yearsOfExperience">years Of Experience</Label>

        <Input
          disabled={!isEditing}
          name="yearsOfExperience"
          type="number"
          placeholder="Years Of Experience"
          defaultValue={form.yearsOfExperience}
          className="m-0 mt-1"
          min={0}
          max={80}
        />
      </div>
      {isEditing ? (
        <div>
          <Button
            className="mt-2 bg-[#FCAE1D] hover:bg-[#dea02f]"
            size="sm"
            type="submit"
            disabled={isPending}
          >
            {form.id === "" ? "Create" : "Save"}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsEditing(false)}
            type="button"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          className="mt-2 bg-[#FCAE1D] hover:bg-[#dea02f]"
          size="sm"
          onClick={() => setIsEditing(true)}
          type="button"
        >
          Edit
        </Button>
      )}
    </form>
  );
};

const UpdateKeyPersonnel = ({
  initProjects,
  info,
}: {
  initProjects: PastPro[];
  info: Info;
}) => {
  const [form, setForm] = useState(initProjects);

  const add = () => {
    if (form.length >= 5) return;
    setForm((prev) => [...prev, InitProject]);
  };

  const remove = (ind: number) => {
    if (form.length <= 1) return;
    setForm((prev) => prev.filter((_, i) => i !== ind));
  };

  return (
    <Card className="border-none bg-[#F3F3F3] mt-4">
      <CardHeader className="text-2xl font-semibold">
        <div>
          Key<span className="text-[#FCAE1D]"> Persons</span>
          {form.length >= 5 ? null : (
            <Button
              type="button"
              size="icon"
              className="h-7 w-7 ml-2 bg-[#FCAE1D] hover:bg-[#dea02f]"
              onClick={add}
            >
              <FaPlus />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 px-12">
        {form.map((f, i) => (
          <PastProjectInput
            remove={remove}
            form={f}
            info={info}
            ind={i}
            key={`keyPerson-${i}`}
          />
        ))}
        {form.length === 0 && <strong>No Key Person to show.</strong>}
      </CardContent>
    </Card>
  );
};
export default UpdateKeyPersonnel;

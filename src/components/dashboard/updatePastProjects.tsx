import { createPastProject } from "@/core/server/actions/dashboard/createPastProject";
import { deletePastProject } from "@/core/server/actions/dashboard/deletePastProject";
import useMutation from "@/hooks/useMutation";
import { PastProject } from "@prisma/client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";

type PastPro = Pick<
  PastProject,
  "id" | "clientName" | "description" | "projectName" | "year"
>;
type Info =
  | { type: "Agency"; agencyId: string }
  | { type: "Dmc"; dmcId: string };

const InitProject = {
  projectName: "",
  clientName: "",
  description: "",
  year: 0,
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
  const { mutate: deleteProject, isPending: isPendingDelete } =
    useMutation(deletePastProject);
  const { mutate, isPending } = useMutation(createPastProject);
  const [isEditing, setIsEditing] = useState(form.id === "");

  const handleSubmit = async (formData: FormData) => {
    const projectName = formData.get("projectName") as string;
    const clientName = formData.get("clientName") as string;
    const description = formData.get("description") as string;
    const year = parseInt(formData.get("year") as string);
    const { success, error } = await mutate({
      data: { projectName, clientName, description, year },
      id: form.id === "" ? undefined : form.id,
      agencyId: info.type === "Agency" ? info.agencyId : undefined,
      dmcId: info.type === "Dmc" ? info.dmcId : undefined,
    });
    if (success) {
      toast.success(success);
      setIsEditing(false);
    } else toast.error(error);
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
          const { success, error } = await deleteProject({
            id: form.id,
            agencyId: info.type === "Agency" ? info.agencyId : undefined,
            dmcId: info.type === "Dmc" ? info.dmcId : undefined,
          });
          if (success) toast.success(success);
          else toast.error(error);
        }}
      >
        <RxCross2 />
      </Button>
      <div className="">
        <Label htmlFor="projectName">Name of Project</Label>
        <Input
          autoFocus={form.id === ""}
          disabled={!isEditing}
          type="text"
          name="projectName"
          placeholder="Name of project"
          defaultValue={form.projectName}
          className="m-0 mt-1"
          required
          minLength={3}
          maxLength={50}
        />
      </div>
      <div className="">
        <Label htmlFor="clientName">Client Name</Label>

        <Input
          name="clientName"
          disabled={!isEditing}
          type="text"
          placeholder="Client Name"
          defaultValue={form.clientName}
          className="m-0 mt-1"
          required
          minLength={3}
          maxLength={50}
        />
      </div>
      <div className="">
        <Label htmlFor="description">Description of Project</Label>

        <Textarea
          disabled={!isEditing}
          name="description"
          placeholder="Project Description"
          defaultValue={form.description}
          className="m-0 mt-1"
          required
          minLength={10}
          maxLength={250}
        />
      </div>
      <div className="">
        <Label htmlFor="year">Year</Label>

        <Input
          disabled={!isEditing}
          name="year"
          type="number"
          placeholder="Year"
          defaultValue={form.year === 0 ? undefined : form.year}
          className="m-0 mt-1"
          min={1900}
          max={new Date().getFullYear()}
        />
      </div>
      {isEditing ? (
        <div>
          <Button
            className="mt-2 bg-mainColor hover:bg-mainColor/80"
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
          className="mt-2 bg-mainColor hover:bg-mainColor/80"
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

const UpdatePastProjects = ({
  initProjects,
  info,
}: {
  initProjects: PastPro[];
  info: Info;
}) => {
  const [form, setForm] = useState(initProjects);

  useEffect(() => {
    setForm(initProjects);
  }, [initProjects]);

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
          <span className="text-mainColor">Recommendation</span>
          {form.length >= 5 ? null : (
            <Button
              type="button"
              size="icon"
              className="h-7 w-7 ml-2 bg-mainColor hover:bg-[#dea02f]"
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
            key={`pastPro-${i}`}
          />
        ))}
        {form.length === 0 && <strong>No recommendation to show.</strong>}
      </CardContent>
    </Card>
  );
};
export default UpdatePastProjects;

import { createClientRefAction } from "@/core/server/actions/dashboard/createClientRef";
import { deleteClientRefAction } from "@/core/server/actions/dashboard/deleteClientRef";
import useMutation from "@/hooks/useMutation";
import { ClientReference } from "@prisma/client";
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
  ClientReference,
  "id" | "clientName" | "contactEmail" | "contactPhone" | "testimonial"
>;
type Info =
  | { type: "Agency"; agencyId: string }
  | { type: "Dmc"; dmcId: string };

const InitProject = {
  contactEmail: "",
  clientName: "",
  contactPhone: "",
  testimonial: "",
  id: "",
};

const ClientRefInput = ({
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
  const { mutate: deleteClientRef, isPending: isPendingDelete } = useMutation(
    deleteClientRefAction
  );
  const { mutate, isPending } = useMutation(createClientRefAction);
  const [isEditing, setIsEditing] = useState(form.id === "");

  const handleSubmit = async (formData: FormData) => {
    const testimonial = formData.get("testimonial") as string;
    const clientName = formData.get("clientName") as string;
    const contactPhone = formData.get("contactPhone") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const { success, error } = await mutate({
      data: { testimonial, clientName, contactPhone, contactEmail },
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
        // @ts-expect-error
        if (e.target.contactPhone?.value?.length < 10) {
          toast.error("Contact phone must be of length 10.");
          return;
        }
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
          const { success, error } = await deleteClientRef({
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
        <Label htmlFor="clientName">Client Name</Label>
        <Input
          autoFocus={form.id === ""}
          disabled={!isEditing}
          type="text"
          name="clientName"
          placeholder="Name of Client"
          defaultValue={form.clientName}
          className="m-0 mt-1"
          required
          minLength={3}
          maxLength={50}
        />
      </div>
      <div className="">
        <Label htmlFor="contactEmail">Client Email</Label>

        <Input
          name="contactEmail"
          disabled={!isEditing}
          type="email"
          placeholder="Client Email"
          defaultValue={form.contactEmail}
          className="m-0 mt-1"
          required
        />
      </div>
      <div className="">
        <Label htmlFor="contactPhone">Client Contact Phone</Label>

        <Input
          disabled={!isEditing}
          name="contactPhone"
          type="number"
          placeholder="Contact Phone"
          defaultValue={form.contactPhone}
          className="m-0 mt-1"
        />
      </div>
      <div className="">
        <Label htmlFor="testimonial">Testimonial</Label>

        <Textarea
          disabled={!isEditing}
          name="testimonial"
          placeholder="Client Testimonial"
          defaultValue={form.testimonial}
          className="m-0 mt-1"
          required
          minLength={10}
          maxLength={250}
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

const UpdateClientReferences = ({
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
          Client<span className="text-mainColor"> References</span>
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
          <ClientRefInput
            remove={remove}
            form={f}
            info={info}
            ind={i}
            key={`clientRefInp-${i}`}
          />
        ))}
        {form.length === 0 && <strong>No Client References to show.</strong>}
      </CardContent>
    </Card>
  );
};
export default UpdateClientReferences;

"use client";
import { SocialMediaLinks } from "@prisma/client";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { updateSocialLinks } from "@/core/server/actions/socialLinks/updateSocialLinks";
import useMutation from "@/hooks/useMutation";
import { toast } from "sonner";
import { Button } from "../ui/button";

const UpdateSocialMediaLinks = ({
  info,
  links,
  socialMediaLinkId,
}: {
  info:
    | { type: "Agency"; agencyId: string }
    | { type: "Dmc"; dmcId: string }
    | { type: "Hotel"; hotelId: string };
  socialMediaLinkId: string;
  links: SocialMediaLinks;
}) => {
  const { mutate, isPending } = useMutation(updateSocialLinks);
  const action = async (formData: FormData) => {
    const youtube = (formData.get("youtube") as string) || undefined;
    const linkedin = (formData.get("linkedin") as string) || undefined;
    const twitter = (formData.get("twitter") as string) || undefined;
    const instagram = (formData.get("instagram") as string) || undefined;
    const facebook = (formData.get("facebook") as string) || undefined;
    const { success, error } = await mutate({
      values: {
        facebook,
        instagram,
        linkedin,
        twitter,
        youtube,
        id: socialMediaLinkId,
      },
      info,
    });
    if (success) toast.success(success);
    else toast.error(error);
  };
  return (
    <Card className="border-none bg-[#F3F3F3] mt-4">
      <CardHeader className="text-2xl font-semibold">
        <div>
          <span className="text-[#FCAE1D]">Social-Media </span>
          Links
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fData = new FormData(e.currentTarget);
            action(fData);
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <Input
              id="facebook"
              name="facebook"
              defaultValue={links.facebook ?? ""}
              type="text"
              placeholder="facebook"
              className="m-0 mt-1"
            />
          </div>
          <div>
            <Input
              id="instagram"
              name="instagram"
              defaultValue={links.instagram ?? ""}
              type="text"
              placeholder="instagram"
              className="m-0 mt-1"
            />
          </div>
          <div>
            <Input
              id="twitter"
              name="twitter"
              defaultValue={links.twitter ?? ""}
              type="text"
              placeholder="twitter"
              className="m-0 mt-1"
            />
          </div>
          <div>
            <Input
              id="linkedin"
              name="linkedin"
              defaultValue={links.linkedin ?? ""}
              type="text"
              placeholder="linkedin"
              className="m-0 mt-1"
            />
          </div>
          <div>
            <Input
              id="youtube"
              name="youtube"
              defaultValue={links.youtube ?? ""}
              type="text"
              placeholder="youtube"
              className="m-0 mt-1"
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-[#fcaf1e] hover:bg-[#fcaf1e]/80 sm:col-span-2 w-fit"
          >
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default UpdateSocialMediaLinks;

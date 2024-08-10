"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ChevronLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Company, CompanyData, CompanyRole, User } from "@prisma/client";
import useMutation from "@/hooks/useMutation";
import { createCompanyAdmin } from "@/core/server/actions/company/createCompanyAdmin";
import { toast } from "sonner";
import UploadImage from "@/components/company/FormSteps/step4";
import UploadUserImage from "./UploadUserImage";

type CompanyType = Omit<
  Company,
  | "id"
  | "createdAt"
  | "isSuspended"
  | "updatedAt"
  | "userId"
  | "image"
  | "methodology"
  | "rating"
  | "reviews"
> & { image: string; methodology: string };

type CompanyDataType = Omit<
  CompanyData,
  "id" | "companyId" | "description" | "images" | "socialLinks"
> & {
  agencyGroup: string;
  ownerContact: string;
  companyEmail: string;
  description: string;
  images: string;
  socialLinks: string;
  abta_number: string;
  clia_number: string;
  tids_number: string;
  iata_number: string;
};

function AddListing() {
  const [user, setUser] = useState({ username: "", email: "", image: "" });
  const [company, setCompany] = useState<CompanyType>({
    companyRole: "DMC",
    isCertified: true,
    image: "",
  } as CompanyType);
  const [companyData, setCompanyData] = useState<CompanyDataType>(
    {} as CompanyDataType
  );

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompany((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleCompanyDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCompanyData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { mutate, isPending } = useMutation(createCompanyAdmin);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let { socialLinks, ...rest } = companyData;
    const { priority, state_priority, image, ...restCompany } = company;

    const socialLinksArr = socialLinks?.split(",");
    const { success, error } = await mutate({
      user,
      company: {
        ...restCompany,
        image: "",
        priority: Number(priority),
        state_priority: Number(state_priority),
      },
      companyData: { ...rest, images: [], socialLinks: socialLinksArr },
    });
    if (success) {
      setUser({ username: "", email: "", image: "" });
      setCompany((prev) => ({
        ...prev,
        companyRole: "DMC",
        isCertified: true,
        image: "",
      }));
      setCompanyData({} as CompanyDataType);
      toast.success(success);
    } else toast.error(error);
  };
  return (
    <Card className="grid flex-1 items-start gap-4 px-4 py-2 mt-5">
      <div className="mx-auto grid flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/companies">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Add a Company
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 lg:gap-8"
        >
          <div className="grid auto-rows-max items-start gap-4 col-span-1 lg:col-span-2 lg:gap-8">
            {/* User Account card */}
            <Card>
              <CardHeader>
                <CardTitle>Company User Account Details</CardTitle>
                <CardDescription>
                  This will be the email and username of the account that will
                  be used to access the company.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Label htmlFor="username">Username*</Label>
                    <Input
                      id="username"
                      name="username"
                      required
                      minLength={5}
                      type="text"
                      value={user.username}
                      onChange={handleUserChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      name="email"
                      required
                      type="email"
                      value={user.email}
                      onChange={handleUserChange}
                    />
                  </div>
                  <Label htmlFor="">Image</Label>
                  {user.image !== "" && (
                    <Image
                      src={user.image}
                      alt="user image"
                      width={100}
                      height={100}
                    />
                  )}
                  <UploadUserImage
                    handleChange={(url: string) => {
                      setUser((prev) => ({ ...prev, image: url }));
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="grid gap-1">
                    <Label htmlFor="legalName">Legal Name</Label>
                    <Input
                      required
                      name="legalName"
                      id="legalName"
                      value={company.legalName}
                      onChange={handleCompanyChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="companyRole">Company Role</Label>
                    <Select
                      onValueChange={(val: CompanyRole) =>
                        setCompany((prev) => ({ ...prev, companyRole: val }))
                      }
                      value={company.companyRole}
                      name="companyRole"
                    >
                      <SelectTrigger
                        id="companyRole"
                        aria-label="Select company Role"
                      >
                        <SelectValue placeholder="Select company Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AGENCY">AGENCY</SelectItem>
                        <SelectItem value="DMC">DMC</SelectItem>
                        <SelectItem value="HOTEL">HOTEL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="isCertified">IsCertified</Label>
                    <Select
                      onValueChange={(val) =>
                        setCompany((prev) => ({
                          ...prev,
                          isCertified: val === "true",
                        }))
                      }
                      value={String(company.isCertified)}
                      name="isCertified"
                    >
                      <SelectTrigger
                        id="isCertified"
                        aria-label="Select isCertified"
                      >
                        <SelectValue placeholder="Select isCertified" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      required
                      name="country"
                      id="country"
                      value={company.country}
                      onChange={handleCompanyChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="state">State</Label>
                    <Input
                      required
                      name="state"
                      id="state"
                      value={company.state}
                      onChange={handleCompanyChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                      required
                      name="city"
                      id="city"
                      value={company.city}
                      onChange={handleCompanyChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="priority">Priority(Country)</Label>
                    <Input
                      required
                      type="number"
                      name="priority"
                      id="priority"
                      value={company.priority}
                      onChange={handleCompanyChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="state_priority">Priority(City)</Label>
                    <Input
                      required
                      type="number"
                      name="state_priority"
                      id="state_priority"
                      value={company.state_priority}
                      onChange={handleCompanyChange}
                    />
                  </div>
                  {/* <div className="grid gap-1">
                    <Label htmlFor="image">Image</Label>
                    <Input
                      required
                      name="image"
                      id="image"
                      value={company.image}
                      onChange={handleCompanyChange}
                    />
                  </div> */}
                  <div className="grid gap-1">
                    <Label htmlFor="methodology">Methodology</Label>
                    <Input
                      name="methodology"
                      id="methodology"
                      value={company.methodology}
                      onChange={handleCompanyChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Company Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="grid gap-1">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      required
                      name="address"
                      id="address"
                      value={companyData.address}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      required
                      type="number"
                      name="pincode"
                      id="pincode"
                      value={companyData.pincode}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      required
                      type="number"
                      name="phone"
                      id="phone"
                      value={companyData.phone}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="companyEmail">Company Email</Label>
                    <Input
                      required
                      type="email"
                      name="companyEmail"
                      id="companyEmail"
                      value={companyData.companyEmail}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      required
                      name="ownerName"
                      id="ownerName"
                      value={companyData.ownerName}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="companyContact">Company Contact</Label>
                    <Input
                      required
                      type="number"
                      name="companyContact"
                      id="companyContact"
                      value={companyData.companyContact}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="ownerContact">Owner Contact</Label>
                    <Input
                      required
                      type="number"
                      name="ownerContact"
                      id="ownerContact"
                      value={companyData.ownerContact}
                      onChange={handleCompanyDataChange}
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      name="description"
                      id="description"
                      value={companyData.description}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="agencyGroup">AgencyGroup</Label>
                    <Input
                      name="agencyGroup"
                      id="agencyGroup"
                      value={companyData.agencyGroup}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  {/* <div className="grid gap-1">
                    <Label htmlFor="images">Images(comma separated)</Label>
                    <Input
                      required
                      name="images"
                      id="images"
                      value={companyData.images}
                      onChange={handleCompanyDataChange}
                    />
                  </div> */}
                  <div className="grid gap-1">
                    <Label htmlFor="socialLinks">
                      SocialLinks(comma separated)
                    </Label>
                    <Input
                      required
                      name="socialLinks"
                      id="socialLinks"
                      value={companyData.socialLinks}
                      onChange={handleCompanyDataChange}
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="methodology">Methodology</Label>
                    <Input
                      name="methodology"
                      id="methodology"
                      value={company.methodology}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="abta_number">Abta_number</Label>
                    <Input
                      type="number"
                      name="abta_number"
                      id="abta_number"
                      value={companyData.abta_number}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="clia_number">Clia_number</Label>
                    <Input
                      type="number"
                      name="clia_number"
                      id="clia_number"
                      value={companyData.clia_number}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="tids_number">Tids_number</Label>
                    <Input
                      type="number"
                      name="tids_number"
                      id="tids_number"
                      value={companyData.tids_number}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="iata_number">Iata_number</Label>
                    <Input
                      type="number"
                      name="iata_number"
                      id="iata_number"
                      value={companyData.iata_number}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="business_reg_number">
                      Business registration number
                    </Label>
                    <Input
                      required
                      type="number"
                      name="business_reg_number"
                      id="business_reg_number"
                      value={companyData.business_reg_number}
                      onChange={handleCompanyDataChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger
                        id="status"
                        aria-label="Select status"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className="overflow-hidden"
              x-chunk="dashboard-07-chunk-4"
            >
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="https://img.freepik.com/free-vector/christmas-photography-frame_23-2147529386.jpg?t=st=1722442087~exp=1722445687~hmac=1d52aeec2c2a7065e3f8480811b5339567b0e509cc9087dcd614fdc5196fdac9&w=740"
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="https://img.freepik.com/free-vector/christmas-photography-frame_23-2147529386.jpg?t=st=1722442087~exp=1722445687~hmac=1d52aeec2c2a7065e3f8480811b5339567b0e509cc9087dcd614fdc5196fdac9&w=740"
                        width="84"
                      />
                    </button>
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="https://img.freepik.com/free-vector/christmas-photography-frame_23-2147529386.jpg?t=st=1722442087~exp=1722445687~hmac=1d52aeec2c2a7065e3f8480811b5339567b0e509cc9087dcd614fdc5196fdac9&w=740"
                        width="84"
                      />
                    </button>
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button
                  size="sm"
                  variant="secondary"
                >
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div> */}

          <Button
            type="submit"
            disabled={isPending}
          >
            Create Listing
          </Button>
        </form>
      </div>
    </Card>
  );
}

export default AddListing;

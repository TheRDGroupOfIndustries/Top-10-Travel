import DeletePackageButton from "@/components/companydashboard/packages/DeletePackageButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { getValidUrl } from "@/lib/utils";
import { Package } from "@prisma/client";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 1;
const getPackages = async (id: string) => {
  const packages = await db.package.findMany({ where: { companyId: id } });
  return packages;
};

const PackageCard = ({ data }: { data: Package }) => {
  return (
    <Card className="w-full mt-5 h-[450px] rounded-xl max-w-sm mx-auto transition-all duration-300 hover:shadow-lg ">
      <div className="relative h-[50%] overflow-hidden">
        <Image
          fill
          alt={`${data.title} - Package`}
          src={getValidUrl(data.image)}
          className="rounded-t-md object-cover w-auto h-auto"
        />
        <div className="absolute top-2 right-2">
          <DeletePackageButton packageId={data.id} />
        </div>
      </div>
      <CardContent className="p-4 h-[50%]">
        <h2 className="text-xl md:text-2xl font-bold ">{data.title}</h2>
        <p className="text-foreground/80 mb-4 text-sm md:text-base text-left line-clamp-5">
          {data.desc}
        </p>
        <p className="text-muted-foreground text-sm md:text-base text-left font-semibold mb-4">
          <span className="text-xl font-bold text-foreground">
            ${data.price}
          </span>{" "}
          {data.duration}
        </p>
        <p className="text-muted-foreground text-sm md:text-base text-left font-semibold mb-4">
          {data.amenities.map((amenity, ind) => (
            <span
              key={ind}
              className=""
            >
              {amenity}
              {ind !== data.amenities.length - 1 && ", "}
            </span>
          ))}
        </p>
      </CardContent>
    </Card>
  );
};

const PackagesPage = async () => {
  const session = await getSessionorRedirect();
  const company = await db.company.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });
  if (!company) return notFound();

  const packages = await getPackages(company.id);
  return (
    <div className="flex flex-col items-center justify-center relative h-[88vh]">
       <div className="relative">
  <h1 className="relative z-10 font-bold text-center text-[30px] text-transparent bg-clip-text bg-gradient-to-r from-[#FCAE1D] to-[#F3F3F3]">
  All Your Packages:
  </h1>
  <div className="absolute inset-0 z-50 mx-auto p-[7vh] rounded-full w-[20vw] h-[10vh] bg-[#FCAE1D] blur-2xl opacity-40 "></div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {packages.map((p) => (
          <PackageCard
            key={p.id}
            data={p}
          />
        ))}
        {packages.length === 0 ? (
          <div className="font-semibold col-span-1 md:col-span-2 lg:col-span-3 self-center text-lg text-center max-w-sm mx-auto flex flex-col items-center justify-center gap-4">
            <p>
              You dont have any packages, therefore your company will be in a
              suspended state, hence not visible to any users. Create a package
              to become active again
            </p>
            <Link href="/company/packages/create">
              <Button className="mt-2 bg-[#FCAE1D]">Create Package</Button>
            </Link>
          </div>
        ) : (
          <Link
            className="fixed bottom-6 right-6 shadow-xl"
            href="/company/packages/create"
          >
            <Button className="mt-6">Create Package</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default PackagesPage;

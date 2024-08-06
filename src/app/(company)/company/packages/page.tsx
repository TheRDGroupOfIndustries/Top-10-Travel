import DeletePackageButton from "@/components/companydashboard/packages/DeletePackageButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Package } from "@prisma/client";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const getPackages = async (id: string) => {
  const packages = await db.package.findMany({ where: { companyId: id } });
  return packages;
};

const PackageCard = ({ data }: { data: Package }) => {
  return (
    <Card className="w-full min-h-[520px] rounded-xl max-w-sm mx-auto transition-all duration-300 hover:shadow-lg">
      <div className="relative h-64 md:h-72">
        <Image
          layout="fill"
          objectFit="cover"
          alt={`${data.title} - Package`}
          src={data.image}
          className="rounded-t-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        <h2 className="absolute bottom-4 left-4 text-xl md:text-2xl font-bold text-white">
          {data.title}
        </h2>
      </div>
      <CardContent className="p-4">
        <p className="text-foreground/80 mb-4 text-sm md:text-base text-left line-clamp-3">
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
        <DeletePackageButton packageId={data.id} />
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

  const packages = await getPackages(company.id)
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold my-10">All Your Packages:</h2>
      <div className="flex flex-wrap gap-8 pb-8">
        {packages.map((p) => (
          <PackageCard
            key={p.id}
            data={p}
          />
        ))}
        {packages.length === 0 && (
          <div className="font-semibold text-lg text-center mt-20 max-w-sm">
            You dont have any packages, therefore your company will be in a
            suspended state, hence not visible to any users. Create a package to
            become active again
            <Link href="/company/pacakge/create">
              <Button className="mt-6">Create Package</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default PackagesPage;
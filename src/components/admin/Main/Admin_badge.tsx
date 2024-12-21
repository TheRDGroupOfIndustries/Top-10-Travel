"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import AddBadge from "./Admin_Add_Badge";

interface DATA {
  id: string;
  name: string;
  url: string;
  imageId: string;
  createdAt: Date;
  updatedAt: Date;
}

const Badge = ({ data }: { data: DATA[] }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [badges, setBadges] = React.useState(data);
  const [disabledActions, setDisabledActions] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleAction = async (id: string) => {
    const endpoint = `/api/badges/delete`;

    // Disable the button for the current action
    setDisabledActions((prev) => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send id in request body
      });

      if (response.ok) {
        setBadges((prev) => prev.filter((review) => review.id !== id));
      } else {
        console.error("Failed to perform action:", await response.text());
        // Re-enable the button if the action fails
        setDisabledActions((prev) => ({ ...prev, [id]: false }));
      }
    } catch (error) {
      console.error("Error performing action:", error);
      // Re-enable the button if there's an error
      setDisabledActions((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Filter recommendations based on search input
  const filteredBadges = badges.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Card className="mt-5 z-[999] p-4 bg-[#F3F3F3]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold">
            Listing of <span className="text-mainColor">Badges</span>
          </h2>
          <p className="font-medium text-sm text-[#36454F]">
            <span className="font-bold">{filteredBadges.length}</span> Total
          </p>
        </div>
      </div>
      <div className="flex items-center flex-wrap p-1 md:p-0">
        <Input
          placeholder="Search by name or id..."
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          className="max-w-sm bg-[#fbfbfb] focus-visible:ring-0"
        />
        <div className="ml-auto inline-block">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#F3F3F3] hover:bg-[#dbdbdb] border-mainColor"
              >
                Add Badge <Plus className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <AddBadge />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#c2c2c2] hover:bg-[#c2c2c2] text-white">
              <TableHead className="text-white w-[45px]"></TableHead>
              <TableHead className="text-white">Image</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBadges.length > 0 ? (
              filteredBadges.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium ">
                    <Image
                      src={item.url}
                      alt=""
                      height={15}
                      width={80}
                      className="h-[30px] w-fit"
                    />
                  </TableCell>
                  <TableCell className="font-medium w-[50vw]">
                    {item.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Button
                      onClick={() => handleAction(item.id)}
                      variant="outline"
                      className="bg-red-200 hover:bg-red-300"
                      disabled={disabledActions[item.id]}
                    >
                      {disabledActions[item.id] ? "Deleting..." : "Delete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default Badge;

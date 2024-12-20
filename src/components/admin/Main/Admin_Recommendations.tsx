"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";

interface DATA {
  id: string;
  name: string;
  rating: number;
  review: string;
  approved: boolean;
  userId: string;
  agencyName: string | null;
  agencyId: string | null;
  dmcId: string | null;
  dmcName: string | null;
  hotelId: string | null;
  hotelName: string | null;
  createdAt: Date | null;
}

const AdminRecommendations = ({ data }: { data: DATA[] }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [recommendations, setRecommendations] = React.useState(data);
  const [disabledActions, setDisabledActions] = React.useState<{ [key: string]: boolean }>({});

  const handleAction = async (id: string, action: "approve" | "decline") => {
    const endpoint =
      action === "approve"
        ? `/api/reviews/approve`
        : `/api/reviews/decline`;

    // Disable the button for the current action
    setDisabledActions((prev) => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }) // Send id in request body
      });

      if (response.ok) {
        setRecommendations((prev) => prev.filter((review) => review.id !== id));
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
  const filteredRecommendations = recommendations.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Card className="mt-5 z-[999] p-4 bg-[#F3F3F3]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold">
            Listing of <span className="text-mainColor">recommendations</span>
          </h2>
          <p className="font-medium text-sm text-[#36454F]">
            <span className="font-bold">{filteredRecommendations.length}</span>{" "}
            Total
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
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#c2c2c2] hover:bg-[#c2c2c2] text-white">
              <TableHead className="text-white w-[45px]"></TableHead>
              <TableHead className="text-white">Influencer</TableHead>
              <TableHead className="text-white">Agency&Dmc</TableHead>
              <TableHead className="text-white">Content</TableHead>
              <TableHead className="text-white">Approve</TableHead>
              <TableHead className="text-white">Decline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecommendations.length > 0 ? (
              filteredRecommendations.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-medium">
                    {item.agencyName}
                  </TableCell>
                  <TableCell className="font-medium">{item.review}</TableCell>
                  <TableCell className="font-medium">
                    <Button
                      variant="outline"
                      className="bg-green-200 hover:bg-green-300"
                      onClick={() => handleAction(item.id, "approve")}
                      disabled={disabledActions[item.id]}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Button
                      onClick={() => handleAction(item.id, "decline")}
                      variant="outline"
                      className="bg-red-200 hover:bg-red-300"
                      disabled={disabledActions[item.id]}
                    >
                      Decline
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

export default AdminRecommendations;

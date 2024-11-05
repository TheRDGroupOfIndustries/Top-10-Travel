"use client";
import HomeCards from "@/components/reusable/HomeCards";
import HomeCompanySkeleton from "@/components/reusable/HomeCompanySkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { HomeContext } from "@/hooks/context/HomeContext";
import useAxios from "@/hooks/useAxios";
import { cn, getValidUrl } from "@/lib/utils";
import { DMCHotelApiResult } from "@/types/homeApiType";
import axios from "axios";
import { motion } from "framer-motion";
import { SquareArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function TopTenHotels() {
  const { selectedCountry, selectedCity, visible, allHotels } =
    useContext(HomeContext);

  //   console.log("allAgencies", allHotels);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placedCards, setPlacedCards] = useState(Array(16).fill(null));
  const [draggedItem, setDraggedItem] = useState<{
    item: any;
    sourceType: "cities" | "grid";
    sourceIndex: number;
  } | null>(null);
  const [error, setError] = useState("");

  const clearError = () => {
    setTimeout(() => setError(""), 3000);
  };

  const findCardIndex = (cardId: string) => {
    return placedCards.findIndex((card) => card && card.id === cardId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/topten?role=Hotel`);
      setPlacedCards(response.data.result);
    };

    fetchData();
  }, []);

  const handleDragStart = (
    e: React.DragEvent,
    item: any,
    sourceType: "cities" | "grid",
    index: number
  ) => {
    setDraggedItem({ item, sourceType, sourceIndex: index });
    e.dataTransfer.setData("text/plain", ""); // Required for Firefox
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-blue-100");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-blue-100");
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-100");

    if (!draggedItem) return;

    const newPlacedCards = [...placedCards];

    // If dragging from cities list to grid
    if (draggedItem.sourceType === "cities") {
      // Check if card already exists in grid
      const existingIndex = findCardIndex(draggedItem.item.id);
      if (existingIndex !== -1) {
        // toast({
        //   title: "Warning",
        //   description: "This agency is already placed in the grid!",
        //   variant: "destructive",
        // });
        return;
      }

      // If dropping on an empty spot
      if (!newPlacedCards[targetIndex]) {
        newPlacedCards[targetIndex] = draggedItem.item;
      }
      // If dropping on an occupied spot, shift cards
      else {
        // Find the next empty spot
        // const emptyIndex = newPlacedCards.indexOf(null);
        // if (emptyIndex === -1) {
        //   // toast({
        //   //   title: "Warning",
        //   //   description: "No empty spots available!",
        //   //   variant: "destructive",
        //   // });
        //   return;
        // }

        // // Shift cards between target and empty spot
        // if (emptyIndex > targetIndex) {
        //   for (let i = emptyIndex; i > targetIndex; i--) {
        //     newPlacedCards[i] = newPlacedCards[i - 1];
        //   }
        // } else {
        //   for (let i = emptyIndex; i < targetIndex; i++) {
        //     newPlacedCards[i] = newPlacedCards[i + 1];
        //   }
        // }
        newPlacedCards[targetIndex] = draggedItem.item;
      }
    }
    // If dragging from grid to grid
    else if (draggedItem.sourceType === "grid") {
      if (targetIndex === draggedItem.sourceIndex) return;

      // Remove card from source
      const [removed] = newPlacedCards.splice(draggedItem.sourceIndex, 1, null);

      // If dropping on an empty spot
      if (!newPlacedCards[targetIndex]) {
        newPlacedCards[targetIndex] = removed;
      }
      // If dropping on an occupied spot, shift cards
      else {
        // Shift cards between source and target
        if (targetIndex > draggedItem.sourceIndex) {
          for (let i = draggedItem.sourceIndex; i < targetIndex; i++) {
            newPlacedCards[i] = newPlacedCards[i + 1];
          }
        } else {
          for (let i = draggedItem.sourceIndex; i > targetIndex; i--) {
            newPlacedCards[i] = newPlacedCards[i - 1];
          }
        }
        newPlacedCards[targetIndex] = removed;
      }
    }

    setPlacedCards(newPlacedCards);
    setDraggedItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry) {
      // toast({
      //   title: "Error",
      //   description: "Please select a country first",
      //   variant: "destructive",
      // });
      return;
    }

    setIsSaving(true);

    try {
      // Filter out null values and get ordered IDs
      const cityOrder = placedCards
        .filter((card) => card !== null)
        .map((card, index) => {
          return { city: card.city, order: index };
        });

      // console.log("cityOrder:", cityOrder);

      const response = await axios.put(`/api/topten?role=Hotel`, {
        cityOrder,
      });

      if (response.status === 200) {
        // toast({
        //   title: "Success",
        //   description: "Top agencies order updated successfully!",
        // });
      } else {
        throw new Error("Failed to update order");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to save changes",
      //   variant: "destructive",
      // });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="w-full text-center py-8">Loading...</div>;
  }

  return (
    <section
      className={cn("w-full h-fit mt-10 px-2", visible.AGENCY ? "" : "hidden")}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl lg:overflow-hidden sm:text-4xl font-bold text-center">
          <motion.span
            className="inline-block"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            viewport={{ once: true }}
          >
            {`TOP 10 HOTELS${
              selectedCountry ? ", " + selectedCountry.toUpperCase() : ""
            }${selectedCity ? "-" + selectedCity.toUpperCase() : ""}`}
          </motion.span>
        </h1>

        <div className="w-full flex flex-row gap-4">
          <div className="w-4/5 h-fit grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 sm:gap-4 gap-3">
            {placedCards.map((card, index) => (
              <div
                key={`grid-${index}`}
                draggable={!!card}
                onDragStart={
                  card
                    ? (e) => handleDragStart(e, card, "grid", index)
                    : undefined
                }
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className={`h-36 transition-all duration-200`}
              >
                {card ? (
                  <CardContent className="relative  flex items-end  justify-center  cursor-pointer w-full h-full overflow-hidden p-2  ">
                    <img
                      src={
                        "https://th.bing.com/th/id/OIP.-edFDcSqlon5xMykpg5qMgHaEK?w=1920&h=1080&rs=1&pid=ImgDetMain"
                      }
                      alt={`Background image of  card`}
                      className="absolute object-cover rounded-lg  "
                    />
                    <div className="w-[95%] p-2 m-2 space-y-0.5 h-fit bg-white/80 backdrop-blur-sm rounded-lg">
                      <p className="font-bold text-lg line-clamp-1 text-nowrap text-slate-800">
                        {card.city}
                      </p>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="flex items-center justify-center h-full text-gray-500">
                    Drop here
                  </CardContent>
                )}
              </div>
            ))}
          </div>

          <div className="w-[20%] min-w-[230px] border h-[60vh] flex flex-col items-center  p-4">
            <h2 className="font-semibold mb-4">Available Agencies</h2>
            <div className="space-y-4 w-full overflow-y-auto">
              {allHotels.map((agency, index) => (
                <Card
                  key={(agency as { id: string }).id}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, agency, "cities", index)
                  }
                  className="cursor-move hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="p-3">
                    <h3 className="text-sm font-medium">
                      {(agency as { city: string }).city}
                    </h3>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 mb-8">
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TopTenHotels;

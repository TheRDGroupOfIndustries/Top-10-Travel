"use client";
import HomeCards from "@/components/reusable/HomeCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HomeContext } from "@/hooks/context/HomeContext";
import { cn, getValidUrl } from "@/lib/utils";
import { DMCHotelApiResult } from "@/types/homeApiType";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const formData = new FormData();

const TopTenDMC = () => {
  const { selectedCountry, selectedCity, visible } =
    useContext(HomeContext);

  //   console.log("allAgencies", allDMC);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [placedCards, setPlacedCards] = useState(Array(12).fill(null));
  const [draggedItem, setDraggedItem] = useState<{
    item: any;
    sourceType: "cities" | "grid";
    sourceIndex: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [allCities, setAllCities] = useState<[]>([]);

  const [btnMessage, setBtnMessage] = useState("Save Changes");

  const clearError = () => {
    setTimeout(() => setError(""), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [cityOrder, allCities] = await Promise.all([
        axios.get(
          `/api/topten?role=DMC&country=${selectedCountry}`
        ),
        axios.get(`/api/allcity?role=DMC&country=${selectedCountry}`),
      ]);
      
      const data = cityOrder.data.result;

      if (data.length > 0) {
        // console.log("data", data);
        const newPlacedCards = Array(12).fill(null)

        for (let i = 0; i < data.length; i++) {
          newPlacedCards[i] = data[i]
        }

        setPlacedCards(newPlacedCards)

      }

      if(data.length === 0 && placedCards[0] !== null) {
        setPlacedCards(Array(12).fill(null));
      }

      setAllCities(allCities.data.result);
      // console.log("allCities", allCities.data.result);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const findCardIndex = (cardId: string) => {
    return placedCards.findIndex((card) => card && card.country === cardId);
  };

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
      const existingIndex = findCardIndex(draggedItem.item.country);
      if (existingIndex !== -1) {
        toast.error("This country is already placed in the grid!");
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
      // const [removed] = newPlacedCards.splice(draggedItem.sourceIndex, 1, null);

      // If dropping on an empty spot
      // if (!newPlacedCards[targetIndex]) {
      //   newPlacedCards[targetIndex] = removed;
      // }
      // // If dropping on an occupied spot, shift cards
      // else {
      //   // Shift cards between source and target
      //   if (targetIndex > draggedItem.sourceIndex) {
      //     for (let i = draggedItem.sourceIndex; i < targetIndex; i++) {
      //       newPlacedCards[i] = newPlacedCards[i + 1];
      //     }
      //   } else {
      //     for (let i = draggedItem.sourceIndex; i > targetIndex; i--) {
      //       newPlacedCards[i] = newPlacedCards[i - 1];
      //     }
      //   }
      //   newPlacedCards[targetIndex] = removed;
      // }

      [newPlacedCards[targetIndex], newPlacedCards[draggedItem.sourceIndex]] = [
        newPlacedCards[draggedItem.sourceIndex],
        newPlacedCards[targetIndex],
      ];
    }

    setPlacedCards(newPlacedCards);
    setDraggedItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry) {
      toast.error("Please select a country first");
      return;
    }

    setIsSaving(true);

    if(Array.from(formData.entries()).length > 0) {
      setBtnMessage("Saving Images");

      
        // const response = await axios.post(`/api/topten/image-upload`, {
        //   formData
        // });

        const response = await fetch("/api/topten/image-upload", {
          method: "POST",
          body: formData,
        });

        
    }

  

    setBtnMessage("Saving new orders")

    try {
      // Filter out null values and get ordered IDs

      // console.log("placecard", placedCards);

      const cityOrder = placedCards
        .filter((card) => card !== null)
        .map((card, index) => {
          return {
            country: card.country,
            order: index,
            image: card.image || card.images[0],
          };
        });

      // console.log("cityOrder:", cityOrder);

      const response = await axios.put(`/api/topten?role=DMC`, {
        cityOrder,
      });

      if (response.status === 200) {
        toast.success("Top DMC order updated successfully!");
      } else {
        throw new Error("Failed to update order");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    id: String
  ) => {
    const files = e.target?.files;
    if (files && files.length > 0) {
      const file = files[0];

      setPlacedCards((pre) => {
        const newPlacedCards = [...pre];
        newPlacedCards[index].image = URL.createObjectURL(file);
        return newPlacedCards;
      });

      formData.append("id", String(id));
      formData.append("role", "DMC");
      formData.append("image", file);
      
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
            {`TOP 10 DMC`}
          </motion.span>
        </h1>

        <div className="w-full flex flex-row gap-4">
          <div className="w-4/5 h-fit grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 sm:gap-4 gap-3">
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
                className={`h-[140px] transition-all duration-200`}
              >
                {card ? (
                  <div className="relative flex items-end  justify-center shadow cursor-pointer  transform-all duration-300 w-full h-full border border-1 rounded-lg">`
                    <img
                      src={card.image || card.images[0]}
                      alt={`Background image of  card`}
                      className="absolute object-cover rounded-lg h-full w-full   "
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index, card.id)}
                      className="opacity-0 absolute top-0 left-0 cursor-pointer h-full w-full"
                    />
                    <div className="w-[100%] p-2 m-2 space-y-0.5 h-16 bg-white/80 backdrop-blur-sm rounded-lg">
                      <p className="font-bold text-lg text-slate-800">
                        {card.country}
                      </p>
                      <p className="uppercase text-sm font-semibold tracking-wide text-slate-700">
                        {card.country}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Card className="h-[140px] transition-all duration-200">
                    <CardContent className="flex items-center justify-center h-full text-gray-500">
                      Drop here
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>

          <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, -1)}
        className="w-[20%] bg-transparent  border h-[635px] flex flex-col items-center  p-4">
            <h2 className="font-semibold mb-4">Available Countries</h2>
            <div className="space-y-4 w-full overflow-y-auto flex flex-col items-center pr-3">
              {allCities.map((agency : { country: string, id: string,  }, index) => (
                <Card
                  key={(agency as { id: string }).id}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, agency, "cities", index)
                  }
                  className={`cursor-move hover:shadow-lg transition-shadow w-full text-center ${placedCards.some(item => item?.country === agency?.country) ? "bg-red-300 text-black/50" : ""}`}
                >
                  <CardHeader className="p-3">
                    <h3 className="text-sm font-medium">
                      {(agency as { country: string }).country}
                    </h3>
                  </CardHeader>
                </Card>
              ))}
            </div>
            {
                allCities.length === 0 && (
                  <div className=" h-full transition-shadow w-full text-center self-center ">
                    <CardHeader className="p-3 mt-auto">
                      <h3 className="text-sm font-medium">
                        No City found
                      </h3>
                    </CardHeader>
                  </div>
                )
              }
          </div>
        </div>

        <div className="mt-6 mb-8">
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {btnMessage}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopTenDMC;

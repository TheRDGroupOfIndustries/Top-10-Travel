import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeContext } from "@/hooks/context/HomeContext";
import { cn } from "@/lib/utils";
import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";

const formData = new FormData();

const TopTenInfluencers = () => {
  const { selectedCountry, selectedCity, visible, } =
    useContext(HomeContext);

  // console.log("allAgencies", allAgencies);

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

  const findCardIndex = (city: string) => {
    return placedCards.findIndex((card) => card && card.state === city);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [cityOrder, allCities] = await Promise.all([
        axios.get(
          `/api/topten?role=Influencer&country=${selectedCountry}`
        ),
        axios.get(`/api/allcity?role=Influencer&country=${selectedCountry}`),
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

      setIsLoading(false);
    };

    fetchData();
  }, [selectedCountry]);

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

  const handleDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-100");
  
    if (!draggedItem) return;
  
    const newPlacedCards = [...placedCards];
  
    // If dragging from cities list to grid
    if (draggedItem.sourceType === "cities") {
      if (targetIndex !== undefined) {
        // Check if the card already exists in the grid
        const existingIndex = findCardIndex(draggedItem.item.state);
        if (existingIndex !== -1) return;
  
        // Place the item in the target grid position if it's empty
        if (!newPlacedCards[targetIndex]) {
          newPlacedCards[targetIndex] = draggedItem.item;
        } else {
          // Handle any shifting cards logic here if needed
          newPlacedCards[targetIndex] = draggedItem.item;
        }
      }
    }
    // If dragging from grid to cities list, remove the item from the grid
    else if (draggedItem.sourceType === "grid" && targetIndex === -1) {
      newPlacedCards[draggedItem.sourceIndex] = null; // Clear data by setting to null
    }
    // If dragging from grid to grid, perform the swap
    else if (draggedItem.sourceType === "grid" && targetIndex !== undefined) {
      if (targetIndex === draggedItem.sourceIndex) return;
  
      // Swap items between source and target
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
      // toast({
      //   title: "Error",
      //   description: "Please select a country first",
      //   variant: "destructive",
      // });
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
      const cityOrder = placedCards
        .filter((card) => card !== null)
        .map((card, index) => {
          return {
            city: card.state,
            order: index,
            country: selectedCountry,
            image: card.image || "",
          };
        });

      // console.log("cityOrder:", cityOrder);

      const response = await axios.put(`/api/topten?role=Influencer`, {
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
      formData.append("role", "Influencer");
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
            {`TOP 10 INFLUENCERS${
              selectedCountry ? ", " + selectedCountry.toUpperCase() : ""
            }${selectedCity ? "-" + selectedCity.toUpperCase() : ""}`}
          </motion.span>
        </h1>

        <div className="w-full flex flex-row gap-4">
          <div className="relative w-4/5 h-fit grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 sm:gap-4 gap-3">
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
                  <div className="relative flex items-end  justify-center shadow cursor-pointer  transform-all duration-300 w-full h-full border border-1 rounded-lg">
                    <img
                      src={card.image || ""}
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
                        {card.state}
                      </p>
                      <p className="uppercase text-sm font-semibold tracking-wide text-slate-700">
                        {selectedCountry}
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
            <h2 className="font-semibold mb-4">Available Cities</h2>
            <div 
            className="space-y-4 w-full overflow-y-auto flex flex-col items-center pr-3">
              {allCities.map((agency: { id: string; state: string }, index) => (
                <Card
                  key={(agency as { id: string }).id}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, agency, "cities", index)
                  }
                  className={`cursor-move hover:shadow-lg transition-shadow w-full text-center ${placedCards.some(item => item?.state === agency?.state) ? "bg-red-300 text-black/50" : ""}`}
                >
                  <CardHeader className="p-3">
                    <h3 className="text-sm font-medium">
                      {(agency as { state: string }).state}
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

export default TopTenInfluencers;

// "use client";
import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function City() {
    const [overlay, setOverlay] = useState(false);
    const priority = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return (
    <>
    
    <div className={`w-full h-[90%] relative`}>
       { overlay && (
        <form className="absolute inset-[20%] py-12 z-40 rounded-md w-1/2 h-3/5 bg-slate-600 opacity-100 shadow-2xl flex justify-center items-start p-4 gap-4 flex-col">
            <h1 className="text-white text-3xl font-bold">Add City</h1>
            <input className="p-4 bg-gray-500 text-white outline-none rounded-md w-full" type="text" placeholder="Country name" />
            <input className="p-4 bg-gray-500 text-white outline-none rounded-md w-full" type="text" placeholder="City name" />
            <input className="p-4 bg-gray-500 text-white outline-none rounded-md w-full" type="file" accept="*/.jpg" />
            <select className="p-4 bg-gray-500 text-white outline-none rounded-md w-full">
                <option value="">Select Priority</option>
                {priority.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
            </select>
            <Button>Add +</Button>
        </form>
       )}
      <div className={`flex justify-between w-full ${overlay ? "opacity-10" : "opacity-100"}`}>
        <h1 className="font-bold text-4xl">City controls</h1>
        <div className="flex gap-4">
        <Button color="#f04a4a" onClick={() => setOverlay(!overlay)}>Add city +</Button>
        </div>
      </div>
    </div>
                  </>
  );
}

export default City;

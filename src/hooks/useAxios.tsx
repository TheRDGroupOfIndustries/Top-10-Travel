import { AgencyApiResult, DMCHotelApiResult } from "@/types/homeApiType";
import { $Enums } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = ({
  url,
  selectedCity,
  selectedCountry,
}: {
  url: string;
  selectedCountry: string;
  selectedCity: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setData(res.data.result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    console.log(selectedCity, selectedCountry);
    if (selectedCountry !== "") {
      fetchData();
    }
  }, [url, selectedCity, selectedCountry]);
  return { data, isLoading: loading };
};
export default useAxios;

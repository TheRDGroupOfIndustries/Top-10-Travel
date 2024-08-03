import { HomeApiResult } from "@/types/homeApiType";
import { $Enums } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = ({ url }: { url: string }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HomeApiResult | null>(null);
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
    fetchData();
  }, [url]);
  return { data, isLoading: loading };
};
export default useAxios;

import { HomeApiResult } from "@/types/homeApiType";
import axios from "axios";
import { useEffect, useState } from "react";

const useDMC = ({ country }: { country: string; state?: string}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HomeApiResult|null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `/api/home?country=${country}&role=DMC`
        );
        setLoading(false);
        setData(res.data.result);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData()
  }, [country]);
  return { data, isLoading: loading };
};
export default useDMC;

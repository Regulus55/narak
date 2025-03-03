// 이전 가격 차트 데이터
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTwelveData = (searchInput: string) => {
  const getTwelveData = async (query: string) => {
    const API_KEY = "08b39f29ee2b42f7a501fbf451b7a7d5";
    const url = `https://api.twelvedata.com/time_series?symbol=${query}&interval=1day&apikey=${API_KEY}`;
    const response = await axios.get(url);

    console.log("퉬브데이타 리스폰스", response);

    return {
      symbol: response.data.meta.symbol,
      priceHistory: response.data.values.reverse(),
      type: response.data.meta.type,
      status: response.data.status,
    };
  };

  return useQuery({
    queryKey: ["TwelveData", searchInput],
    queryFn: () => getTwelveData(searchInput),
  });
};

export default useTwelveData;

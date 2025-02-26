// 이전 가격 차트 데이터
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSearchStockTwelve = (searchInput: string) => {
  const getStockPrice = async (query: string) => {
    const API_KEY = "08b39f29ee2b42f7a501fbf451b7a7d5";
    const url = `https://api.twelvedata.com/time_series?symbol=${query}&interval=1day&apikey=${API_KEY}`;
    const response = await axios.get(url);

    return {
      symbol: response.data.meta.symbol,
      priceHistory: response.data.values.reverse(),
    };
  };

  return useQuery({
    queryKey: ["StockPriceData", searchInput],
    queryFn: () => getStockPrice(searchInput),
  });
};

export default useSearchStockTwelve;

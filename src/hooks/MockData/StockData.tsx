import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface StockData {
  c: number; // Current price
  h: number; // High price
  l: number; // Low price
  o: number; // Open price
  pc: number; // Previous close
}

const getStockData = async (stockSearchInput: string): Promise<StockData> => {
  const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
  const url = `https://finnhub.io/api/v1/quote?symbol=${stockSearchInput}&token=${API_KEY}`;
  const response = await axios.get<StockData>(url);
  return response.data;
};

const useStockData = (stockSearchInput: string) => {
  return useQuery<StockData>({
    queryKey: ["stock", stockSearchInput],
    queryFn: () => getStockData(stockSearchInput),
    refetchInterval: 1000,
  });
};

export default useStockData;

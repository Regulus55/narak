// useSearchStockLogo.ts (훅 파일)
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSearchStockLogo = (searchInput: string) => {
  const getStockLogo = async (query: string) => {
    const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${query}&token=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.logo;
  };

  return useQuery({
    queryKey: ["LogoData", searchInput],
    queryFn: () => getStockLogo(searchInput), // 여기서 searchInput을 사용
  });
};

export default useSearchStockLogo;

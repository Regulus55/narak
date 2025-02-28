// 로고, 현재가
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFinhubData = (searchInput: string) => {
  const getFinhubData = async (query: string) => {
    const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
    const logoUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${query}&token=${API_KEY}`;
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${query}&token=${API_KEY}`;

    const [logoResponse, quoteResponse] = await Promise.all([
      axios.get(logoUrl),
      axios.get(quoteUrl),
    ]);

    return {
      logo: logoResponse.data.logo,
      currentPrice: quoteResponse.data.c,
    };
  };

  return useQuery({
    queryKey: ["FinhubData", searchInput],
    queryFn: () => getFinhubData(searchInput),
    enabled: !!searchInput,
  });
};

export default useFinhubData;

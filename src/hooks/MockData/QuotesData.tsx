import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getQuotes = async () => {
  const url = `https://dummyjson.com/quotes`;
  const response = await axios.get(url);
  return response.data;
};

const useQuotesList = () => {
  return useQuery({
    queryKey: ["quote"],
    queryFn: () => getQuotes(),
  });
};

export default useQuotesList;

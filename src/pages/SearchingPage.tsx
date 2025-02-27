import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useSearchStockFinhub from "../hooks/Stock/useSearchStockFinhub";
import useSearchStockTwelve from "../hooks/Stock/useSearchStockTwelve";
import { FormInput } from "../components/common";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface searchStockInput {
  searchInput: string;
}

const SearchingPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<searchStockInput>({
    defaultValues: {
      searchInput: "",
    },
  });

  const [searchInput, setSearchInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { data: LogoData, isLoading } = useSearchStockFinhub(searchInput); // 주식 로고 데이터
  const { data: StockData } = useSearchStockTwelve(searchInput); // 주식 가격 데이터

  console.log("asdf", suggestions);

  useEffect(() => {
    if (searchInput.trim() !== "") {
      // 주식 검색 결과가 logo와 currentPrice만 있다면, 적절히 수정합니다.
      const stockSuggestions = StockData?.symbol ? [StockData.symbol] : [];
      setSuggestions(stockSuggestions); // stockData에서 로고나 이름만 가져오기
    } else {
      setSuggestions([]);
    }
  }, [searchInput, LogoData, StockData]);

  const searchStockHandler = (userInput: searchStockInput) => {
    const { searchInput } = userInput;
    setSearchInput(searchInput);
  };

  const navigateStockHandler = (symbol: string) => {
    navigate(`/stock/${symbol}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(searchStockHandler)}
        className="flex gap-2 relative"
      >
        <FormInput
          id="stockSymbol"
          type="text"
          label="주식이름"
          register={register("searchInput", {
            required: "주식 이름을 입력하세요",
          })}
          errorMessage={errors.searchInput?.message}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          검색
        </button>

        <div className="absolute  mt-20 max-w-lg w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {suggestions.map((stock) => (
            <div
              key={stock}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigateStockHandler(stock.symbol)}
            >
              {stock}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SearchingPage;

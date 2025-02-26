import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
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
import { FormInput } from "../components/common";
import useSearchStockLogo from "../hooks/Stock/useSearchStockLogo";

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

const StockChart = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<searchStockInput>({
    defaultValues: {
      searchInput: "",
    },
  });
  const searchInput = watch("searchInput");

  const { data: LogoData, isLoading } = useSearchStockLogo(searchInput);

  const searchStockLogoHandler = (searchInput: searchStockInput) => {
    console.log("hook form test", searchInput);
    console.log("받은로그데이타타타타", LogoData);
  };

  const [stockSymbolData, setStockSymbolData] = useState<string>("");
  const [searchSymbol, setSearchSymbol] = useState<string>("");
  const [stockHistory, setStockHistory] = useState<any[]>([]);
  const [priceData, setPriceData] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSymbol, setCurrentSymbol] = useState<string>("");

  const API_KEY = "08b39f29ee2b42f7a501fbf451b7a7d5";

  const fetchStockData = async (searchInput: string) => {
    if (!searchInput) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.twelvedata.com/time_series?symbol=${searchInput}&interval=1day&apikey=${API_KEY}`
      );

      if (response.data.status === "ok") {
        setStockHistory(response.data.values);
        setPriceData(response.data);
        setCurrentSymbol(response.data.meta.searchInput);
      } else {
        setError(
          "데이터를 가져오는 데 실패했습니다. 주식 심볼을 확인해주세요."
        );
      }
    } catch (err) {
      setError("데이터를 가져오는 데 실패했습니다. 나중에 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchSymbol) {
      fetchStockData(searchSymbol);
    }
  }, [searchSymbol]);

  console.log("쿼리 로고데이타타타타", LogoData);

  const reversedData = [...stockHistory].reverse();
  const currentPrice = reversedData.length > 0 ? reversedData[0].close : null;

  const handleSearch = () => {
    setSearchSymbol(stockSymbolData.toUpperCase());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const [logoData, setLogoData] = useState<any | null>();

  // const getSingleStockData = useCallback(async (stockSymbolData: string) => {
  //   try {
  //     const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
  //     const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${stockSymbolData}&token=${API_KEY}`;
  //     const response = await axios.get(url);

  //     console.log(response);
  //     if (response.data.dp === null) {
  //       setLogoData(null);
  //     } else if (response.status === 200) {
  //       setLogoData(response.data.logo);
  //     }
  //   } catch (error: any) {
  //     console.log(error.response.data.error);
  //   }
  // }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (stockSymbolData) {
  //       getSingleStockData(stockSymbolData);
  //     }
  //   }, 5000);
  //   return () => clearInterval(intervalId);
  // }, [stockSymbolData, getSingleStockData]);

  // const searchStockHandler = async (userInput:searchStockInput) => {
  //   try{

  //   }
  // }

  useEffect(() => {
    console.log("로고데이타타타타타", logoData);
    console.log("프라이스데이타타타타", priceData);
  }, [logoData, priceData]);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Stock Data Chart
      </h1>

      <form
        onSubmit={handleSubmit(searchStockLogoHandler)}
        className="flex gap-2"
      >
        {/* <input
          id="stockSymbol"
          type="text"
          value={stockSymbolData}
          onChange={(e) => setStockSymbolData(e.target.value.toUpperCase())}
          onKeyDown={handleKeyPress}
          placeholder="주식 심볼을 입력하세요 (예: AAPL)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        /> */}
        <FormInput
          id="stockSymbol"
          type="text"
          label="주식이름"
          register={register("searchInput", {
            required: "주식 이름을 입력하세요",
          })}
          errorMessage={errors.searchInput?.message}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          검색
        </button>
      </form>

      {currentSymbol && (
        <div className="text-xl font-semibold mt-4">
          <img src={logoData} alt="" className="w-12 h-12" />
          <p>현재 보고 있는 심볼: {currentSymbol}</p>
        </div>
      )}

      {currentPrice && (
        <div className="text-xl font-semibold text-green-600">
          <p>현재가: ${parseFloat(currentPrice).toFixed(2)}</p>
        </div>
      )}

      {loading && <p className="text-blue-500">데이터를 로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-2xl mt-6">
        <Line
          data={{
            labels: reversedData.map((data) => data.datetime),
            datasets: [
              {
                label: "Close Price",
                data: reversedData.map((data) => parseFloat(data.close)),
                fill: false,
                borderColor: "#8884d8",
                tension: 0.1,
              },
              {
                label: "Open Price",
                data: reversedData.map((data) => parseFloat(data.open)),
                fill: false,
                borderColor: "#82ca9d",
                tension: 0.1,
              },
              {
                label: "High Price",
                data: reversedData.map((data) => parseFloat(data.high)),
                fill: false,
                borderColor: "#ff7300",
                tension: 0.1,
              },
              {
                label: "Low Price",
                data: reversedData.map((data) => parseFloat(data.low)),
                fill: false,
                borderColor: "#ff0000",
                tension: 0.1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: { display: true, text: "Stock Prices" },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const label = tooltipItem.dataset.label || "";
                    const value = Number(tooltipItem.raw);
                    return `${label}: $${value.toFixed(2)}`;
                  },
                },
              },
            },
            scales: {
              x: { type: "category" },
              y: { beginAtZero: false },
            },
          }}
        />
      </div>
    </div>
  );
};

export default StockChart;

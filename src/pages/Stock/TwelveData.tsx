import { useState } from "react";
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
import { FormInput } from "../../components/common";
import useSearchStockFinhub from "../../hooks/Stock/useSearchStockFinhub";
import useSearchStockTwelve from "../../hooks/Stock/useSearchStockTwelve";

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

interface StockData {
  datetime: string;
  close: string;
  open: string;
  high: string;
  low: string;
}

const StockChart = () => {
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
  const searchStockHandler = (userInput: searchStockInput) => {
    const { searchInput } = userInput;
    setSearchInput(searchInput);
  };

  const { data: LogoData, isLoading } = useSearchStockFinhub(searchInput); // 주식 로고 데이터
  const { data: PriceData } = useSearchStockTwelve(searchInput); // 주식 가격 데이터

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Stock Data Chart
      </h1>

      <form onSubmit={handleSubmit(searchStockHandler)} className="flex gap-2">
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

      <img src={LogoData?.logo} alt="" className="w-12 h-12" />

      {PriceData?.symbol && (
        <div className="text-xl font-semibold mt-4">
          <p> {PriceData?.symbol}</p>
        </div>
      )}

      {LogoData?.currentPrice && (
        <div className="text-xl font-semibold text-green-600">
          <p>현재가: ${parseFloat(LogoData?.currentPrice).toFixed(2)}</p>
        </div>
      )}

      <div className="w-full max-w-2xl mt-6">
        <Line
          data={{
            labels: PriceData?.priceHistory?.map(
              (data: StockData) => data.datetime
            ),
            datasets: [
              {
                label: "Close Price",
                data: PriceData?.priceHistory?.map((data: StockData) =>
                  parseFloat(data.close)
                ),
                fill: false,
                borderColor: "#8884d8",
                tension: 0.1,
              },
              {
                label: "Open Price",
                data: PriceData?.priceHistory?.map((data: StockData) =>
                  parseFloat(data.open)
                ),
                fill: false,
                borderColor: "#82ca9d",
                tension: 0.1,
              },
              {
                label: "High Price",
                data: PriceData?.priceHistory?.map((data: StockData) =>
                  parseFloat(data.high)
                ),
                fill: false,
                borderColor: "#ff7300",
                tension: 0.1,
              },
              {
                label: "Low Price",
                data: PriceData?.priceHistory?.map((data: StockData) =>
                  parseFloat(data.low)
                ),
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

import { useState, useEffect } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = () => {
  const [stockSymbolData, setStockSymbolData] = useState<string>("");
  const [searchSymbol, setSearchSymbol] = useState<string>("");
  const [stockHistory, setStockHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSymbol, setCurrentSymbol] = useState<string>("");

  const API_KEY = "08b39f29ee2b42f7a501fbf451b7a7d5";

  const fetchStockData = async (symbol: string) => {
    if (!symbol) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${API_KEY}`
      );

      if (response.data.status === "ok") {
        setStockHistory(response.data.values);
        setCurrentSymbol(response.data.meta.symbol);
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Stock Data Chart
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={stockSymbolData}
          onChange={(e) => setStockSymbolData(e.target.value.toUpperCase())}
          onKeyDown={handleKeyPress}
          placeholder="주식 심볼을 입력하세요 (예: AAPL)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          검색
        </button>
      </div>

      {currentSymbol && (
        <div className="text-xl font-semibold mt-4">
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

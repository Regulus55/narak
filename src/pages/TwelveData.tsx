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
  const [stockSymbol, setStockSymbol] = useState<string>("");
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
    if (stockSymbol) {
      fetchStockData(stockSymbol);
    }
  }, [stockSymbol]);

  const reversedData = [...stockHistory].reverse();

  const currentPrice = reversedData.length > 0 ? reversedData[0].close : null;

  useEffect(() => {
    console.log("주식데이터터ㅓㅌ터터터", reversedData);
  }, [reversedData]);

  const chartData = {
    labels: reversedData.map((data: any) => data.datetime),
    datasets: [
      {
        label: "Close Price",
        data: reversedData.map((data: any) => parseFloat(data.close)),
        fill: false,
        borderColor: "#8884d8",
        tension: 0.1,
      },
      {
        label: "Open Price",
        data: reversedData.map((data: any) => parseFloat(data.open)),
        fill: false,
        borderColor: "#82ca9d",
        tension: 0.1,
      },
      {
        label: "High Price",
        data: reversedData.map((data: any) => parseFloat(data.high)),
        fill: false,
        borderColor: "#ff7300",
        tension: 0.1,
      },
      {
        label: "Low Price",
        data: reversedData.map((data: any) => parseFloat(data.low)),
        fill: false,
        borderColor: "#ff0000",
        tension: 0.1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Stock Prices",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem: any) {
            const label = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            return `${label}: $${value.toFixed(2)}`;
          },
          title: function (tooltipItem: any) {
            return `Date: ${tooltipItem[0].label}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category", // X축은 카테고리 형식
      },
      y: {
        beginAtZero: false, // Y축 0부터 시작하지 않음
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Stock Data Chart
      </h1>

      <input
        type="text"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
        placeholder="주식 심볼을 입력하세요 (예: AAPL)"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-6"
      />

      {currentSymbol && (
        <div className="text-xl font-semibold mb-4">
          <p>현재 보고 있는 심볼: {currentSymbol}</p>
        </div>
      )}

      {currentPrice && (
        <div className="text-xl font-semibold mb-4 text-green-600">
          <p>현재가: ${parseFloat(currentPrice).toFixed(2)}</p>
        </div>
      )}

      {loading && <p className="text-blue-500">데이터를 로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-2xl mt-6">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StockChart;

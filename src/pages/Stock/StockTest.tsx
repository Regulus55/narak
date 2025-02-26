import React, { useState, useEffect } from "react";
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

// chart.js 모듈 등록
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
  const [stockSymbol, setStockSymbol] = useState<string>(""); // 기본 주식 심볼
  const [stockData, setStockData] = useState<any[]>([]); // 가져온 주식 데이터를 저장
  const [loading, setLoading] = useState<boolean>(false); // 데이터 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지
  const [currentSymbol, setCurrentSymbol] = useState<string>(""); // 가져온 주식 심볼을 저장

  const API_KEY = "08b39f29ee2b42f7a501fbf451b7a7d5"; // Twelve Data API 키

  // 주식 데이터를 가져오는 함수
  const fetchStockData = async (symbol: string) => {
    if (!symbol) return;

    setLoading(true); // 로딩 시작
    setError(null); // 에러 초기화

    try {
      const response = await axios.get(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${API_KEY}`
      );

      if (response.data.status === "ok") {
        setStockData(response.data.values); // 주식 데이터 저장
        setCurrentSymbol(response.data.meta.symbol); // 주식 심볼 저장
      } else {
        setError(
          "데이터를 가져오는 데 실패했습니다. 주식 심볼을 확인해주세요."
        );
      }
    } catch (err) {
      setError("데이터를 가져오는 데 실패했습니다. 나중에 다시 시도해주세요.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    if (stockSymbol) {
      fetchStockData(stockSymbol); // 주식 심볼이 있으면 데이터를 가져옴
    }
  }, [stockSymbol]);

  // 주식 데이터를 최신 날짜가 오른쪽에 오도록 반전시킴
  const reversedData = [...stockData].reverse();

  // 가장 최근의 종가를 현재가로 저장
  const currentPrice = reversedData.length > 0 ? reversedData[0].close : null;

  useEffect(() => {
    console.log("주식데이터터ㅓㅌ터터터", reversedData);
  }, [reversedData]);

  // 차트 데이터 준비
  const chartData = {
    labels: reversedData.map((data: any) => data.datetime), // X축 레이블 (날짜)
    datasets: [
      {
        label: "Close Price",
        data: reversedData.map((data: any) => parseFloat(data.close)), // Y축 데이터 (종가)
        fill: true,
        borderColor: "#8884d8",
        tension: 0.1,
      },
      {
        label: "Open Price",
        data: reversedData.map((data: any) => parseFloat(data.open)), // 시가 데이터
        fill: false,
        borderColor: "#82ca9d",
        tension: 0.1,
      },
      {
        label: "High Price",
        data: reversedData.map((data: any) => parseFloat(data.high)), // 고가 데이터
        fill: false,
        borderColor: "#ff7300",
        tension: 0.1,
      },
      {
        label: "Low Price",
        data: reversedData.map((data: any) => parseFloat(data.low)), // 저가 데이터
        fill: false,
        borderColor: "#ff0000",
        tension: 0.1,
      },
    ],
  };

  // Chart.js 옵션 설정 (툴팁 커스터마이징 포함)
  const options: any = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Stock Prices", // 차트 제목
      },
      tooltip: {
        mode: "index", // 툴팁 모드 설정
        intersect: false,
        callbacks: {
          // 툴팁 레이블 커스터마이징
          label: function (tooltipItem: any) {
            const label = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            return `${label}: $${value.toFixed(2)}`;
          },
          title: function (tooltipItem: any) {
            return `Date: ${tooltipItem[0].label}`; // 툴팁 제목에 날짜 표시
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

      {/* 현재 보고 있는 주식 심볼을 화면에 표시 */}
      {currentSymbol && (
        <div className="text-xl font-semibold mb-4">
          <p>현재 보고 있는 심볼: {currentSymbol}</p>
        </div>
      )}

      {/* 현재 주식 가격 표시 */}
      {currentPrice && (
        <div className="text-xl font-semibold mb-4 text-green-600">
          <p>현재가: ${parseFloat(currentPrice).toFixed(2)}</p>
        </div>
      )}

      <input
        type="text"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
        placeholder="주식 심볼을 입력하세요 (예: AAPL)"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-6"
      />

      {loading && <p className="text-blue-500">데이터를 로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-2xl mt-6">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StockChart;

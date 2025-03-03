import React from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import useSearchStockData from "../../hooks/Stock/useSearchStockData";

interface StockData {
  datetime: string;
  close: string;
  open: string;
  high: string;
  low: string;
}

const StockDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { logo, symbol, type, priceHistory, currentPrice, status } =
    useSearchStockData(id || "");

  // 검색한 주식을 로컬스토리지로
  let visitedPages = new Set(
    JSON.parse(localStorage.getItem("visitedPages") ?? "[]") as string[]
  );
  if (id && status === "ok") {
    visitedPages.delete(id);
    visitedPages.add(id);
    localStorage.setItem("visitedPages", JSON.stringify([...visitedPages]));
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold">주식 상세 정보</h1>
      <p className="mt-4">검색한 주식: {id}</p>

      <img
        src={
          type !== "Common Stock" && status === "ok" ? "/images/etf.png" : logo
        }
        alt=""
        className="w-12 h-12"
      />
      {symbol && (
        <div className="text-xl font-semibold mt-4">
          <p> {symbol}</p>
        </div>
      )}

      {currentPrice && (
        <div className="text-xl font-semibold text-green-600">
          <p>현재가: ${parseFloat(currentPrice).toFixed(2)}</p>
        </div>
      )}

      <div className="w-full max-w-2xl mt-6">
        <Line
          data={{
            labels: priceHistory?.map((data: StockData) => data.datetime),
            datasets: [
              {
                label: "Close Price",
                data: priceHistory?.map((data: StockData) =>
                  parseFloat(data.close)
                ),
                fill: false,
                borderColor: "#8884d8",
                tension: 0.1,
              },
              {
                label: "Open Price",
                data: priceHistory?.map((data: StockData) =>
                  parseFloat(data.open)
                ),
                fill: false,
                borderColor: "#82ca9d",
                tension: 0.1,
              },
              {
                label: "High Price",
                data: priceHistory?.map((data: StockData) =>
                  parseFloat(data.high)
                ),
                fill: false,
                borderColor: "#ff7300",
                tension: 0.1,
              },
              {
                label: "Low Price",
                data: priceHistory?.map((data: StockData) =>
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

export default StockDetail;

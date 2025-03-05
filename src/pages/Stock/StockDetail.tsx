import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import useSearchStockData from "../../hooks/Stock/useSearchStockData";
import ExchangeRateDropdown from "../../components/Layout/Dropdown/ExchangeRateDropdown";

// react icons
import { IoMdArrowRoundBack } from "react-icons/io";
interface StockData {
  datetime: string;
  close: string;
  open: string;
  high: string;
  low: string;
}

const StockDetail: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const {
    logo,
    symbol,
    type,
    priceHistory,
    currentPrice,
    PriceChange,
    PriceChangePercentage,
    status,
  } = useSearchStockData(id || "");

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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      {/* header */}
      <div id="header" className="flex justify-between w-full">
        <div onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack className="w-7 h-7 hover:cursor-pointer" />
        </div>
        <div className="text-gray-500 border-2 border-gray-500 rounded-full my-auto p-1 hover:cursor-pointer relative">
          <ExchangeRateDropdown />
        </div>
      </div>

      <div className="flex items-center justify-between w-full p-2">
        <div className="flex items-center">
          <img
            src={
              type !== "Common Stock" && status === "ok"
                ? "/images/etf.png"
                : logo
            }
            alt=""
            className="w-10 h-10"
          />
          <h1 className="text-3xl font-semibold mx-2">{id}</h1>
        </div>

        <div>
          <div className="text-2xl text-right font-semibold text-gray-500">
            ${currentPrice ? parseFloat(currentPrice).toFixed(2) : "----"}
          </div>
          <div
            className={`flex space-x-1 text-sm font-semibold ${
              PriceChange > 0 ? "text-red-600" : "text-blue-600"
            }`}
          >
            <div>${parseFloat(PriceChange).toFixed(2)}</div>
            <div>({parseFloat(PriceChangePercentage).toFixed(2)}%)</div>
          </div>
        </div>
      </div>

      <div className="w-full h-[50vh] min-h-[300px] max-w-xl mt-6">
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
            maintainAspectRatio: false,
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

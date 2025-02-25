import axios from "axios";
import useStockData from "../hooks/MockData/StockData";
import { useCallback, useEffect, useState } from "react";

interface StockData {
  c: number; // Current price
  h: number; // High price
  l: number; // Low price
  o: number; // Open price
  pc: number; // Previous close
  dp: number | null;
}

const Datas = () => {
  // const { data: stockData, isLoading, error } = useStockData(searchInput);

  const [stockSearchInput, setStockSearchInput] = useState<string>("");
  const [singleStockData, setSingleStockData] = useState<any | null>();
  const [stockNameData, setStockNameData] = useState<any | null>();
  const [stockDataError, setStockDataError] = useState<string | null>(null);

  const getSingleStockData = useCallback(async (stockSearchInput: string) => {
    try {
      const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
      const url = `https://finnhub.io/api/v1/quote?symbol=${stockSearchInput}&token=${API_KEY}`;
      const response = await axios.get<StockData>(url);

      const nameUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${stockSearchInput}&token=${API_KEY}`;
      const nameResponse = await axios.get(nameUrl);

      console.log(response);
      if (response.data.dp === null) {
        setSingleStockData(null);
        setStockNameData(null);
        setStockDataError("주식이름을 다시한번 확인해봐요");
      } else if (response.status === 200) {
        setSingleStockData(response.data);
        setStockNameData(nameResponse.data);
        setStockDataError(null);
      }
    } catch (error: any) {
      setSingleStockData(null);
      setStockDataError(
        error.response.data.error || "데이터를 받아오는데 실패했읍니다"
      );
      console.log(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    console.log("다타스읭다다다다다타타타타타", stockNameData);
  }, [stockNameData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stockSearchInput) {
        getSingleStockData(stockSearchInput);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [stockSearchInput, getSingleStockData]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Stock Data Search
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getSingleStockData(stockSearchInput);
          }}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              value={stockSearchInput}
              onChange={(e) =>
                setStockSearchInput(
                  e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase()
                )
              }
              placeholder="Enter stock symbol (e.g., AAPL)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>

        {singleStockData && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Stock Data for {stockNameData.ticker}:
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-bold">Current Price:</span> $
                {singleStockData.c}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">High Price:</span> $
                {singleStockData.h}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Low Price:</span> $
                {singleStockData.l}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Open Price:</span> $
                {singleStockData.o}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Previous Close:</span> $
                {singleStockData.pc}
              </p>
              <p>
                <img src={stockNameData.logo} alt="" />
              </p>
            </div>
          </div>
        )}

        {stockDataError && (
          <div className="mt-6 text-red-500 text-center font-semibold">
            ERROR: {stockDataError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Datas;

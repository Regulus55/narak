import axios from "axios";
import useStockData from "../hooks/StockData";
import { useCallback, useEffect, useState } from "react";

interface StockData {
  c: number; // Current price
  h: number; // High price
  l: number; // Low price
  o: number; // Open price
  pc: number; // Previous close
}

const Datas = () => {
  // const { data: stockData, isLoading, error } = useStockData(searchInput);

  const [stockSearchInput, setStockSearchInput] = useState<string>("");
  const [singleStockData, setSingleStockData] = useState<any | null>();
  const [stockDataError, setStockDataError] = useState<string | null>(null);

  const getSingleStockData = useCallback(
    async (stockSearchInput: string) => {
      try {
        const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
        const url = `https://finnhub.io/api/v1/quote?symbol=${stockSearchInput}&token=${API_KEY}`;
        const response = await axios.get<StockData>(url);

        if (response.status === 200) {
          setSingleStockData(response.data);
          setStockDataError(null);
        }
      } catch (error: any) {
        setStockDataError(error.response.data.error);
        console.log(error.response.data.error);
      }
    },
    [stockSearchInput]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      getSingleStockData(stockSearchInput);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [stockSearchInput]);

  return (
    <div>
      <h1>Stock Data Search</h1>
      {/* <div>{getStockDataError}</div> */}
      <input
        type="text"
        value={stockSearchInput}
        onChange={(e) => setStockSearchInput(e.target.value)}
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      <button onClick={() => getSingleStockData(stockSearchInput)}>
        Start
      </button>

      {singleStockData && (
        <div>
          <h3>Stock Data for {stockSearchInput}:</h3>
          <p>Current Price: {singleStockData.c}</p>
          <p>High Price: {singleStockData.h}</p>
          <p>Low Price: {singleStockData.l}</p>
          <p>Open Price: {singleStockData.o}</p>
          <p>Previous Close: {singleStockData.pc}</p>
        </div>
      )}

      {stockDataError && <div>ERROR : {stockDataError}</div>}
    </div>
  );
};

export default Datas;

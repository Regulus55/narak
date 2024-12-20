// HTDatas.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const HTDatas = () => {
  const [stockData, setStockData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const apiKey = process.env.REACT_APP_HANTOO_API_KEY!;
  const apiSecret = process.env.REACT_APP_HANTOO_API_SECRET!;

  const createHeaders = (): Record<string, string> => {
    const timestamp = (Date.now() * 1000).toString();
    const signData = apiKey + apiSecret + timestamp;
    const signature = btoa(signData);

    return {
      "X-API-KEY": apiKey || "",
      "X-Signature": signature,
      "X-Timestamp": timestamp,
    };
  };

  const getStockData = async () => {
    const url = "https://api.koreainvestment.com/v1/market/stock";
    const headers = createHeaders();

    try {
      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setStockData(response.data);
      } else {
        setError(`Error: ${response.status}`);
      }
    } catch (error) {
      setError("API 호출 중 오류 발생");
    }
  };

  useEffect(() => {
    if (!apiKey || !apiSecret) {
      setError("API Key 또는 API Secret이 설정되지 않았습니다.");
      return;
    }
    getStockData();
  }, [apiKey, apiSecret]);

  return (
    <div>
      <h1>HT Datas</h1>
      {error && <p>{error}</p>}
      {stockData ? (
        <pre>{JSON.stringify(stockData, null, 2)}</pre>
      ) : (
        <p>로딩중...</p>
      )}
    </div>
  );
};

export default HTDatas;

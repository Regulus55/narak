import React, { useState, useEffect } from "react";
import axios from "axios";

const HTDatas: React.FC = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await axios.get("https://www.alphavantage.co/query", {
          params: {
            function: "TIME_SERIES_INTRADAY",
            symbol: "005930", // 삼성전자
            interval: "1min",
            apikey: "7DXQASAAH0Z065IS", // 여기에 실제 API 키를 입력하세요.
          },
        });
        console.log(response);
        const timeSeries = response.data["Time Series (1min)"];
        if (!timeSeries) {
          throw new Error("주식 데이터가 없습니다.");
        }

        const latestTime = Object.keys(timeSeries)[0]; // 최신 데이터 시간
        const latestPrice = timeSeries[latestTime]["1. open"]; // 최신 가격
        setPrice(parseFloat(latestPrice));
        setLoading(false);
      } catch (error) {
        setError("주식 가격 조회 오류");
        setLoading(false);
      }
    };

    fetchStockPrice();
  }, []);

  if (loading) {
    return <div>가격을 불러오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>삼성전자 주식 가격</h1>
      <p>{price} 원</p>
    </div>
  );
};

export default HTDatas;

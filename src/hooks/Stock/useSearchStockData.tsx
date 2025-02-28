// 전체 검색 결과
import useFinhubData from "./useFinhubData";
import useTwelveData from "./useTwelveData";

const useSearchStockData = (searchInput: string) => {
  const { data: FinhubData } = useFinhubData(searchInput); // 주식 로고 데이터
  const { data: TwelveData } = useTwelveData(searchInput); // 주식 가격 데이터

  return {
    logo: FinhubData?.logo,
    currentPrice: FinhubData?.currentPrice,
    symbol: TwelveData?.symbol,
    priceHistory: TwelveData?.priceHistory,
  };
};

export default useSearchStockData;

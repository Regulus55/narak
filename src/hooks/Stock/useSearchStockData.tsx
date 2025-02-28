// 전체 검색 결과
import useFinhubData from "./useFinhubData";
import useTwelveData from "./useTwelveData";

const useSearchStockData = (searchInput: string) => {
  const { data: FinhubData } = useFinhubData(searchInput); // 주식 로고 데이터
  const { data: TwelveData } = useTwelveData(searchInput); // 주식 가격 데이터

  // const filteredFinhubData = useSearch(searchInput, FinhubData || []);
  // const filteredTwelveData = useSearch(searchInput, TwelveData || []);

  return {
    logo: FinhubData?.logo, // 로고
    currentPrice: FinhubData?.currentPrice, // 현재가
    symbol: TwelveData?.symbol, // 주식 이름
    priceHistory: TwelveData?.priceHistory, // 이전 가격
    type: TwelveData?.type,
  };
};

export default useSearchStockData;

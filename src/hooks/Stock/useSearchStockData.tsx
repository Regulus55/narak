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
    PriceChange: FinhubData?.PriceChange, // 가격변동 (절대값) / 전일 종가 대비 가격 변화
    PriceChangePercentage: FinhubData?.PriceChangePercentage, // 가격변동률 / 전일 종가 대비 변동 비율
    symbol: TwelveData?.symbol, // 주식 이름
    priceHistory: TwelveData?.priceHistory, // 이전 가격
    type: TwelveData?.type,
    status: TwelveData?.status, //  있는 주식인지
  };
};

export default useSearchStockData;

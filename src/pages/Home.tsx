import React from "react";
import { MainExplain } from "../data/HomeData";
import SearchingStockInput from "../components/Pages/SearchingStockInput";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <SearchingStockInput />

      <MainExplain />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// react icons
import { GrSearch } from "react-icons/gr";
import { MainExplain } from "../data/HomeData";
import { useForm } from "react-hook-form";
import SearchingDropdown from "../components/Layout/Dropdown/SearchingDropdown";

interface searchStockInput {
  searchInput: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchInput: "",
    },
  });
  const searchInput = watch("searchInput");

  // 검색창 열려있는지
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 검색 핸들러
  const searchStockHandler = (userInput: searchStockInput) => {
    const { searchInput } = userInput;
    console.log("우와", searchInput);
    // navigate(`/stock/${searchInput}`);
  };

  // 실시간으로 검색함
  useEffect(() => {
    if (searchInput) {
      searchStockHandler({ searchInput });
    }
  }, [searchInput]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(searchStockHandler)}
        className={`flex w-full max-w-5xl h-12 mt-4 border-2 shadow-xl border-gray-300 bg-white relative
          ${isDropdownOpen ? "rounded-t-lg border-gray-500" : "rounded-lg"}
          `}
      >
        <input
          id="stockSymbol"
          type="text"
          placeholder="주식 이름 검색"
          {...register("searchInput", {
            required: "주식 이름을 입력하세요",
          })}
          className={`w-full p-2 relative outline-none pl-6
              ${isDropdownOpen ? "rounded-t-lg" : "rounded-lg"}
            `}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setIsDropdownOpen(false)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="w-10 h-10 p-1 right-0.5 top-0.5 absolute"
        >
          <GrSearch className="w-full h-full" />
        </button>
        {errors.searchInput && (
          <span className="text-red-500 left-2 top-12 absolute">
            {errors.searchInput.message}
          </span>
        )}
        {isDropdownOpen ? <SearchingDropdown /> : null}
      </form>

      <MainExplain />
    </div>
  );
};

export default Home;

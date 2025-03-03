import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// react icons
import { GrSearch } from "react-icons/gr";
import { useForm } from "react-hook-form";
import SearchingDropdown from "../Layout/Dropdown/SearchingDropdown";

interface searchStockInput {
  searchInput: string;
}

const SearchingStockInput = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchInput: "",
    },
  });

  const searchInputValue = watch("searchInput");

  // 검색창 열려있는지
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 검색 핸들러
  const searchStockHandler = (userInput: searchStockInput) => {
    const { searchInput } = userInput;
    navigate(`/stock/${searchInput}`);
  };

  // 로컬스토리지에 대문자로
  useEffect(() => {
    if (searchInputValue) {
      setValue("searchInput", searchInputValue.toUpperCase());
    }
  }, [searchInputValue, setValue]);

  // 드롭다운 외부 클릭 시 드롭다운 닫기
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(true);
  };

  // 실시간으로 검색함
  // useEffect(() => {
  //   if (searchInput) {
  //     searchStockHandler({ searchInput });
  //   }
  // }, [searchInput]);

  return (
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
        className={`w-full p-2 relative outline-none pl-6 z-10
              ${isDropdownOpen ? "rounded-t-lg" : "rounded-lg"}
        `}
        onClick={toggleDropdown}
        autoComplete="off"
      />
      <button
        type="submit"
        className="absolute w-10 h-10 p-1 right-0.5 top-0.5 z-20"
      >
        <GrSearch className="w-full h-full" />
      </button>
      {errors.searchInput && (
        <span className="text-red-500 left-2 top-12 absolute">
          {errors.searchInput.message}
        </span>
      )}
      <span ref={dropdownRef} className="absolute w-full">
        {isDropdownOpen ? <SearchingDropdown /> : null}
      </span>
    </form>
  );
};

export default SearchingStockInput;

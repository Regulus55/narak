import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// react-icons
import { FaCaretUp } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa6";

const ExchangeRateDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 외부 클릭 시 드롭다운 닫기
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="flex items-center hover:cursor-pointer"
      onClick={toggleDropdown}
    >
      <div className="flex items-center text-gray-600 text-sm px-1 cursor-pointer">
        환율
        <FaCaretDown
          className={`w-4 h-4 transition-transform duration-300 ease-in-out transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div className="relative inline-block" ref={dropdownRef}>
        {isOpen && (
          <div
            className={`absolute text-right pr-4 -left-36 top-6 w-40 h-auto rounded-b-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 p-2 rounded-md shadow-md`}
          >
            1달러 ={" "}
            <span className="text-lg text-gray-800 font-bold">1,432</span> 원
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRateDropdown;

import React from "react";

const SearchingDropdown = () => {
  return (
    <div className="absolute mt-11 mx-auto max-h-[400px] overflow-y-auto w-[calc(100%+4px)] max-w-5xl -translate-x-0.5 p-2 rounded-b-lg shadow-xl border-2 border-gray-500 bg-white">
      {/* 검색결과 */}
      <ul className="ml-4 mt-2 mb-4 space-y-2">
        <li>엔비</li>
        <li>속슬</li>
        <li>테슬</li>
        <li>TQQQ</li>
      </ul>

      {/* 검색기록 */}
      <div className=" w-full border-t border-gray-300">
        <h6 className="ml-4 py-2 text-sm text-gray-400">검색기록</h6>
        <ul className="ml-4 space-y-2">
          <li>엔비</li>
          <li>속슬</li>
          <li>테슬</li>
          <li>TQQQ</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchingDropdown;

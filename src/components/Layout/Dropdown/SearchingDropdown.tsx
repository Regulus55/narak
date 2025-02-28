const mock = ["NVDA", "SOXL", "TSLA", "엔비", "sadfasdfa"];

const SearchingDropdown = () => {
  return (
    <div className="absolute mt-11 mx-auto max-h-[400px] overflow-y-auto w-[calc(100%+4px)] max-w-5xl -translate-x-0.5 p-2 rounded-b-lg shadow-xl border-2 border-gray-500 bg-white">
      {/* 검색결과 */}
      {/* <div className="ml-4 mt-2 mb-4 pb-4 border-b">
        <ul className="space-y-2">
          {mock.map((item, index) => (
            <li>{item}</li>
          ))}
        </ul>
      </div> */}

      {/* 검색기록 */}
      <div className=" w-full pb-2 border-gray-300">
        <h6 className="ml-4 mb-2 text-sm text-gray-400">검색기록</h6>
        <ul className="ml-4 space-y-2">
          {mock.map((item, index) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchingDropdown;

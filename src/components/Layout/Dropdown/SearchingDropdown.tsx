// react icons
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchingDropdown = () => {
  const navigate = useNavigate();
  // 방문 페이지
  const [visitedPages, setVisitedPages] = useState<string[]>([]);

  useEffect(() => {
    const storedPages = JSON.parse(
      localStorage.getItem("visitedPages") ?? "[]"
    );
    setVisitedPages(Array.from(new Set<string>(storedPages)).reverse());
  }, []);

  const removeVisitedPage = (item: string) => {
    const updatedPages = visitedPages.filter((page) => page !== item);
    setVisitedPages(updatedPages);
    localStorage.setItem("visitedPages", JSON.stringify(updatedPages));
  };

  return (
    <div className="mt-11 mx-auto max-h-[400px] overflow-y-auto w-[calc(100%+4px)] max-w-5xl -translate-x-0.5 p-2 rounded-b-lg shadow-xl border-2 border-gray-500 bg-white">
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
        <h6 className="ml-3 text-sm text-gray-400">검색기록</h6>
        <ul className="ml-4 mr-2 mt-2 space-y-3">
          {visitedPages.map((item) => (
            <li className="flex justify-between">
              <div
                onClick={() => navigate(`/stock/${item}`)}
                className="w-full mr-4  hover:cursor-pointer"
              >
                {item}
              </div>
              <IoMdClose
                onClick={() => removeVisitedPage(item)}
                className="w-6 h-6 text-gray-400 hover:cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchingDropdown;

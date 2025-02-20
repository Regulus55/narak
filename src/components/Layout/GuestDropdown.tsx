import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

// react-icons
import { VscAccount } from "react-icons/vsc";
import { MdOutlineVpnKey } from "react-icons/md";
import { LuClipboardPenLine } from "react-icons/lu";

const GuestDropdown = () => {
  const navigate = useNavigate();

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
      <div className="mr-1">
        <VscAccount className="w-7 h-7" />
      </div>

      <div className="relative inline-block text-left" ref={dropdownRef}>
        {isOpen && (
          <div
            className={`
              fixed w-full top-16 left-0 h-auto z-50 rounded-b-md 
              shadow-2xl bg-white ring-1 ring-black ring-opacity-5 p-2
              md:absolute md:-left-40 md:top-6 md:w-40 md:rounded-md md:shadow-md
             
           `}
          >
            <div
              className="flex text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => navigate("/login")}
            >
              <MdOutlineVpnKey className="h-4 w-4 mr-2" />
              로그인
            </div>
            <div
              className="flex text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => navigate("/register")}
            >
              <LuClipboardPenLine className="h-4 w-4 mr-2" />
              회원가입
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestDropdown;

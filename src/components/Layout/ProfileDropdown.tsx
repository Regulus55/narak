import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

// react-icons
import { GoPerson } from "react-icons/go";
import { LiaUserEditSolid } from "react-icons/lia";
import { FiPower } from "react-icons/fi";

interface DropdownProps {
  username: string | null;
  className?: string | null;
}

const ProfileDropdown = ({ username }: DropdownProps) => {
  const navigate = useNavigate();

  // 로그아웃 기능
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

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
      <div className="mr-2">
        <img
          src={"/images/nouser.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-gray-300"
        />
      </div>

      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button className="inline-flex justify-center w-full rounded-md text-sm font-medium text-white hover:scale-105">
          {username}
        </button>

        {isOpen && (
          <div className="absolute -left-12 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2">
            <div className="pt-2">
              <div
                className="flex text-gray-700 block px-4 py-2 text-sm"
                onClick={() => navigate("/profile")}
              >
                <GoPerson className="h-4 w-4 mr-2" />
                프로필
              </div>
              <div
                className="flex text-gray-700 block px-4 py-2 text-sm"
                onClick={() => navigate("/profile/edit")}
              >
                <LiaUserEditSolid className="h-4 w-4 mr-2" />
                프로필 수정
              </div>
            </div>

            <div
              className="flex text-gray-700 block px-4 py-4 text-sm border-t"
              onClick={handleLogout}
            >
              <FiPower className="h-4 w-4 mr-2" />
              로그아웃
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;

import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import ProfileDropdown from "./ProfileDropdown";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

// react-icons
import { IoSettingsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { BsChatLeftText } from "react-icons/bs";
import { ImNewspaper } from "react-icons/im";
import { PiRankingLight } from "react-icons/pi";
import { HiOutlineMenu } from "react-icons/hi";
import { GrSearch } from "react-icons/gr";
import { AiOutlineHome } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();

  const [isSideOpen, setIsSideOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); // auth.currentUser
  const username = user?.displayName || "사용자";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const SideNavIcons = [
    { Icon: AiOutlineHome, text: "홈", path: "/" },
    { Icon: ImNewspaper, text: "뉴스", path: "/news" },
    { Icon: PiRankingLight, text: "랭킹", path: "/ranking" },
    { Icon: BsChatLeftText, text: "채팅", path: "/chat" },
    { Icon: GoBell, text: "알림", onClick: () => console.log("alertttttt") },
    { Icon: IoSettingsOutline, text: "설정", path: "/settings" },
  ];

  return (
    <nav className="bg-mainBlue fixed w-full h-16">
      <div className="flex justify-between items-center w-2/3 h-full mx-auto text-white">
        <div id="left" className="flex items-center mx-2 space-x-4">
          <button
            className="p-2 rounded-md active:scale-110"
            onClick={() => setIsSideOpen((prev) => !prev)}
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>
        </div>

        <div
          id="center"
          onClick={() => navigate("/")}
          className="flex items-center"
          role="button"
        >
          <img
            src={"/images/narakicon.png"}
            alt=""
            className="w-10 h-10 rounded-full mr-1"
          />
          <div className="text-xl">NARAK</div>
        </div>

        <div id="right" className="flex items-center mx-2 space-x-4">
          <GrSearch
            onClick={() => navigate("/datas")}
            className="w-6 h-6 active:scale-110"
            role="button"
          />
          {user ? (
            <>
              <ProfileDropdown username={username} />
            </>
          ) : (
            <div>
              <button
                className="p-2 active:scale-105"
                onClick={() => navigate("/register")}
              >
                회원가입
              </button>
              <button
                className="p-2 active:scale-105"
                onClick={() => navigate("/login")}
              >
                로그인
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed top-16 left-0 h-full w-60 bg-gray-100 border-r-4  border-l-4    transform transition-transform duration-300 ease-in-out ${
          isSideOpen ? "translate-x-80" : "translate-x-16"
        }`}
      >
        <ul className="space-y-4 p-4">
          {SideNavIcons.map(({ Icon, text, path, onClick }, index) => (
            <li
              key={index}
              className="flex items-center hover:bg-gray-700 p-2 rounded"
              onClick={() => (path ? navigate(path) : onClick?.())}
              role="button"
            >
              <Icon className="w-7 h-7 hover:scale-110" />
              <div className="ml-4 font-bold">{text}</div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

// react-icons
import { IoSettingsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { BsChatLeftText } from "react-icons/bs";
import { ImNewspaper } from "react-icons/im";
import { PiRankingLight } from "react-icons/pi";

import { AiOutlineHome } from "react-icons/ai";
import TopNavbar from "./TopNavbar";

const Navbar = () => {
  const navigate = useNavigate();

  const [isSideOpen, setIsSideOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); // auth.currentUser

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
    { Icon: BsChatLeftText, text: "채팅", path: "/chat", loginOnly: true },
    {
      Icon: GoBell,
      text: "알림",
      onClick: () => console.log("alertttttt"),
      loginOnly: true,
    },
    { Icon: IoSettingsOutline, text: "설정", path: "/settings" },
  ];

  return (
    <nav className="bg-mainBlue fixed w-full h-16">
      <TopNavbar
        isSideOpen={isSideOpen}
        setIsSideOpen={setIsSideOpen}
        user={user}
      />

      <div
        className={`fixed top-16 left-0 h-full w-60 bg-gray-100 border-r-4  border-l-4    transform transition-transform duration-300 ease-in-out ${
          isSideOpen ? "translate-x-80" : "translate-x-16"
        }`}
      >
        <ul className="space-y-4 p-4">
          {SideNavIcons.map(({ Icon, text, path, onClick, loginOnly }, index) =>
            loginOnly == undefined || loginOnly == Boolean(user) ? ( //loginOnly 가 없거나 undefined 면 표시, true면 로그인후에만 표시
              <li
                key={index}
                className="flex items-center hover:bg-gray-700 p-2 rounded"
                onClick={() => (path ? navigate(path) : onClick?.())}
                role="button"
              >
                <Icon className="w-7 h-7 hover:scale-110" />
                <div className="ml-4 font-bold">{text}</div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

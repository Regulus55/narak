// react-icons
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { BsChatLeftText } from "react-icons/bs";
import { ImNewspaper } from "react-icons/im";
import { PiRankingLight } from "react-icons/pi";

export const SideNavIcons = [
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

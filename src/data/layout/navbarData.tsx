// 사이드
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { ImNewspaper } from "react-icons/im";
import { PiRankingLight } from "react-icons/pi";
import { PiChatText } from "react-icons/pi";

// 바텀
import { GrMoney } from "react-icons/gr";
import { AiOutlineStock } from "react-icons/ai";

export const SideNavIcons = [
  { Icon: AiOutlineHome, text: "홈", path: "/" },
  { Icon: ImNewspaper, text: "뉴스", path: "/news" },
  { Icon: PiRankingLight, text: "랭킹", path: "/ranking" },
  { Icon: PiChatText, text: "채팅", path: "/chat", loginOnly: true },
  {
    Icon: GoBell,
    text: "알림",
    onClick: () => console.log("alertttttt"),
    loginOnly: true,
  },
  { Icon: IoSettingsOutline, text: "설정", path: "/settings" },
];

export const BottomNavIcons = [
  {
    Icon: GrMoney,
    text: "내 자산",
    onClick: () => console.log("내자산ㄴㄴㄴㄴ"),
    loginOnly: true,
  },
  {
    Icon: AiOutlineStock,
    text: "내 주식",
    onClick: () => console.log("내 주식ㄱㄱㄱㄱㄱ"),
    loginOnly: true,
  },
  { Icon: AiOutlineHome, text: "홈", path: "/" },
  { Icon: PiRankingLight, text: "랭킹", path: "/ranking" },
  { Icon: PiChatText, text: "채팅", path: "/chat", loginOnly: true },
];

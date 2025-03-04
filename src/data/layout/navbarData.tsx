// 사이드
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { ImNewspaper } from "react-icons/im";
import { PiRankingLight } from "react-icons/pi";
import { PiChatText } from "react-icons/pi";
import { GrMoney } from "react-icons/gr";
import { AiOutlineStock } from "react-icons/ai";
import { MdAccountBalance } from "react-icons/md";

export const SideNavIcons = [
  { Icon: AiOutlineHome, text: "홈", path: "/" },
  { Icon: MdAccountBalance, text: "총 자산", path: "/total-assets" },
  { Icon: AiOutlineStock, text: "내 주식", path: "/my-stocks" },
  { Icon: GrMoney, text: "내 잔고", path: "/my-balance" },
  { Icon: ImNewspaper, text: "뉴스", path: "/news" },
  { Icon: PiRankingLight, text: "랭킹", path: "/ranking" },
  { Icon: PiChatText, text: "채팅", path: "/chat", loginOnly: true },
  { Icon: GoBell, text: "알림", path: "/alert", loginOnly: true },
  { Icon: IoSettingsOutline, text: "설정", path: "/settings" },
];

export const BottomNavIcons = [
  {
    Icon: GrMoney,
    text: "내 잔고",
    path: "/my-balance",
    loginOnly: true,
  },
  {
    Icon: AiOutlineStock,
    text: "내 주식",
    path: "/my-stocks",
    loginOnly: true,
  },
  { Icon: AiOutlineHome, text: "홈", path: "/" },
  {
    Icon: MdAccountBalance,
    text: "내 자산",
    path: "/total-assets",
    loginOnly: true,
  },
  { Icon: PiChatText, text: "채팅", path: "/chat", loginOnly: true },
];

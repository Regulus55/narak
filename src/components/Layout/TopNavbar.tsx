import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

// react-icons
import { HiOutlineMenu } from "react-icons/hi";
import { GrSearch } from "react-icons/gr";
import { useSideNav } from "../../context/SideNavProvider";
import { useUser } from "../../context/UserContext";

const TopNavbar = () => {
  const navigate = useNavigate();
  const { setIsSideOpen } = useSideNav();
  const { user } = useUser();

  const username = user?.displayName || "사용자";

  const LogButton = ({ text, path }: { text: string; path: string }) => (
    <button className="py-2 active:scale-105" onClick={() => navigate(path)}>
      {text}
    </button>
  );

  return (
    <nav className="bg-mainBlue fixed top-0 left-0 w-full h-16 z-50">
      <div className="flex justify-between items-center max-w-7xl min-w-[300px] h-full pr-4 mx-auto text-white">
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

        <div id="right" className="flex items-center space-x-4 ">
          {/* <GrSearch
            onClick={() => navigate("/datas")}
            className="w-6 h-6 active:scale-110"
            role="button"
          /> 
            홈 페이지 안에서 쓰기
          */}
          {user ? (
            <ProfileDropdown username={username} />
          ) : (
            <>
              <LogButton text="회원가입" path="/register" />
              <LogButton text="로그인" path="/login" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;

import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import ProfileDropdown from "../common/ProfileDropdown";

const Navbar = () => {
  const navigate = useNavigate();

const username = auth.currentUser?.displayName || '사용자'

  

  return (
    <nav className="bg-mainBlue w-full h-16">
      <div className="flex justify-between items-center w-11/12 h-full mx-auto text-white">
        <div id="left" className="flex mx-2 space-x-2">
          <button onClick={() => navigate("/")} className="flex items-center">
            <img
              src={"/images/narakicon.png"}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>NARAK</div>
          </button>
          <button onClick={() => navigate("/datas")}>datas</button>
        </div>

        <div id="right" className="flex items-center mx-2 space-x-2">
          {auth.currentUser ? (
            <>
              
              {/* <div>{username}</div> */}
              <ProfileDropdown username={username} />
            </>
          ) : (
            <>
              <button onClick={() => navigate("/register")}>회원가입</button>
              <button onClick={() => navigate("/login")}>로그인</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

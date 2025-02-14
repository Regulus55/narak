import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import ProfileDropdown from "./ProfileDropdown";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { onAuthStateChanged, User } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null); // auth.currentUser
  const username = user?.displayName || "사용자";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-mainBlue w-full h-16">
      <div className="flex justify-between items-center w-2/3 h-full mx-auto text-white">
        <div id="left" className="flex mx-2 space-x-4">
          <button onClick={() => navigate("/")} className="flex items-center">
            <img
              src={"/images/narakicon.png"}
              alt=""
              className="w-10 h-10 rounded-full mr-1"
            />
            <div className="text-sm hover:scale-105">NARAK</div>
          </button>
          <button
            onClick={() => navigate("/datas")}
            className="hover:scale-105"
          >
            datas
          </button>
        </div>

        <div id="right" className="flex items-center mx-2 space-x-4">
          {user ? (
            <>
              <ProfileDropdown username={username} />
              <button onClick={() => navigate("/settings")}>
                <IoSettingsOutline className="w-6 h-6 text-white hover:scale-110" />
              </button>
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

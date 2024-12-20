import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

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
          <button onClick={() => navigate("/htdatas")}>htdatas</button>
        </div>

        <div id="right" className="flex items-center mx-2 space-x-2">
          {auth.currentUser ? (
            <>
              <div>
                <img
                  src={"/images/nouser.png"}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
              </div>
              <div>{auth.currentUser?.displayName}</div>
              <button onClick={() => navigate("/profile")}>profile</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/register")}>register</button>
              <button onClick={() => navigate("/login")}>login</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

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
    <nav>
      <div className="flex justify-between mx-2 ">
        <div id="left" className="flex mx-2 space-x-2">
          <button onClick={() => navigate("/")}>Narak</button>
          <button onClick={() => navigate("/datas")}>datas</button>
        </div>

        <div id="right" className="flex mx-2 space-x-2">
          {auth.currentUser ? (
            <>
              <div>{auth.currentUser?.displayName}님</div>
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

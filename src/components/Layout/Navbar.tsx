import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="flex justify-between mx-2 ">
        <div id="left" className="flex mx-2 space-x-2">
          <button onClick={() => navigate("/")}>Narak</button>
          <button onClick={() => navigate("/datas")}>datas</button>
        </div>

        <div id="right" className="flex mx-2 space-x-2">
          <button onClick={() => navigate("/profile")}>profile</button>
          <button onClick={() => navigate("/register")}>register</button>
          <button onClick={() => navigate("/login")}>login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { BottomNavIcons, SideNavIcons } from "../../../data/layout/navbarData";
import { useNavigate } from "react-router-dom";

const BottomNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-100 border-t fixed bottom-0 left-0 w-full h-16 z-50 md:hidden">
      <div className="flex justify-between  h-full mx-2">
        {BottomNavIcons.map(({ Icon, text, path, onClick }, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center w-full h-full active:scale-110 hover:cursor-pointer
              ${
                window.location.pathname === path
                  ? "text-blue-600"
                  : "text-black"
              }`}
            onClick={() => (path ? navigate(path) : onClick?.())}
          >
            <Icon className="w-7 h-7" />
            <div className="text-xs mt-1">{text}</div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;

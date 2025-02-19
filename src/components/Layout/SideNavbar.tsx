import { useNavigate } from "react-router-dom";
import { SideNavIcons } from "../../data/layout/navbarData";
import { useSideNav } from "../../context/SideNavProvider";
import { useUser } from "../../context/UserContext";

const SideNavbar = () => {
  const navigate = useNavigate();
  const { isSideOpen } = useSideNav();
  const { user } = useUser();

  return (
    <ul className="space-y-4 p-4">
      {SideNavIcons.map(({ Icon, text, path, onClick, loginOnly }, index) =>
        loginOnly === undefined || loginOnly === Boolean(user) ? ( //loginOnly 가 없거나 undefined 면 표시, true면 로그인후에만 표시
          <li
            key={index}
            className="grid grid-cols-2 w-full hover:bg-gray-700 p-2 rounded"
            onClick={() => (path ? navigate(path) : onClick?.())}
            role="button"
          >
            <Icon className="w-6 h-6 hover:scale-110" />
            <div className="ml-4 my-auto font-bold text-sm">{text}</div>
          </li>
        ) : null
      )}
    </ul>
  );
};

export default SideNavbar;

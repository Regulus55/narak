import { useNavigate } from "react-router-dom";
import { SideNavIcons } from "../../data/layout/navbarData";
import { useSideNav } from "../../context/SideNavProvider";
import { useUser } from "../../context/UserContext";
import styles from "../../styles/Sidebar.module.css";

const SideNavbar = () => {
  const navigate = useNavigate();
  const { isSideOpen } = useSideNav();
  const { user } = useUser();

  return (
    <div
      className={`${styles.sidebar} ${
        isSideOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      <ul className="space-y-4 p-4">
        {SideNavIcons.map(({ Icon, text, path, onClick, loginOnly }, index) =>
          loginOnly === undefined || loginOnly === Boolean(user) ? ( //loginOnly 가 없거나 undefined 면 표시, true면 로그인후에만 표시
            <li
              key={index}
              className="flex items-center hover:bg-gray-700 p-2 rounded"
              onClick={() => (path ? navigate(path) : onClick?.())}
              role="button"
            >
              <Icon className="w-7 h-7 hover:scale-110" />
              <div className="ml-4 font-bold">{text}</div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default SideNavbar;

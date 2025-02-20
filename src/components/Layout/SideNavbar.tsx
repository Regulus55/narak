import { useNavigate } from "react-router-dom";
import { SideNavIcons } from "../../data/layout/navbarData";
import { useSideNav } from "../../context/SideNavProvider";
import { useUser } from "../../context/UserContext";
import styled from "styled-components";

interface SidebarWrapperProps {
  isSideOpen: boolean;
}

const SidebarWrapper = styled.div<SidebarWrapperProps>`
  position: fixed;
  top: 4rem;
  left: 0;
  height: 100%;
  background-color: #f3f4f6; /* bg-gray-100 */
  border-right: 4px solid #d1d5db;
  border-left: 4px solid #d1d5db;
  width: 180px;
  z-index: 30;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isSideOpen }) =>
    isSideOpen ? "translateX(168%)" : "translateX(78%)"};
`;

const SideNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { isSideOpen } = useSideNav();
  const { user } = useUser();

  return (
    <div
      className={`fixed top-16 left-0 h-full bg-gray-100 border-r-4 border-gray-300 
        transition-transform duration-300 ease-in-out min-w-[10vw] z-30        
        ${isSideOpen ? "translate-x-0 ml-4" : "translate-x-0 hidden"}`}
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

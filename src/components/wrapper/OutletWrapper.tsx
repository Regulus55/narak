import React from "react";
import { useSideNav } from "../../context/SideNavProvider";
import { useUser } from "../../context/UserContext";
import styles from "../../styles/Sidebar.module.css";

const OutletWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isSideOpen } = useSideNav();
  const { user } = useUser();

  return (
    <div className="pt-16 min-h-[80vh] bg-gray-100 z-40">
      {/* 좌우 사이드 배경 */}
      <div className="w-2/3 p-2 min-h-[80vh] mx-auto p-4 bg-gray-200">
        {/* 가운데 회색박스, 위치고정 */}
        <div
          className={`${styles.mainContent} ${
            isSideOpen ? styles.mainContentOpen : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default OutletWrapper;

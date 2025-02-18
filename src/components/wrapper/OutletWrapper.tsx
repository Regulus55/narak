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
    <div className="grid grid-cols-6 w-full pt-16 min-h-[80vh]">
      <div id="left-space" className="col-span-1 bg-gray-100 z-40" />

      <div
        id="main-space"
        className="col-span-4 w-full p-2 min-h-[80vh] mx-auto p-4 bg-gray-200"
      >
        <div
          className={`${styles.mainContent} ${
            isSideOpen ? styles.mainContentOpen : ""
          }`}
        >
          {children}
        </div>
      </div>
      <div id="left-space" className="col-span-1 bg-gray-100 z-40" />
    </div>
  );
};

export default OutletWrapper;

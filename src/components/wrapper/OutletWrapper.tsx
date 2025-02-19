import React from "react";
import { useSideNav } from "../../context/SideNavProvider";
import { useUser } from "../../context/UserContext";
import styled from "styled-components";
import { SideNavbar } from "../Layout";

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
        className="grid col-span-4 grid-cols-12 w-full min-h-[80vh] mx-auto bg-gray-100"
      >
        <div className="col-span-2  fixed">
          <SideNavbar />
        </div>
        <div
          className={`border-r border-black transition-all duration-300 ease-in-out
            ${isSideOpen ? "col-span-2" : "col-span-1"} 
            `}
        />
        <div
          className={`p-4 bg-gray-200 z-40 transition-all duration-300 ease-in-out
            ${isSideOpen ? "col-span-10" : "col-span-11"} 
            `}
        >
          {children}
        </div>
      </div>
      <div id="left-space" className="col-span-1 bg-gray-100 z-40" />
    </div>
  );
};

export default OutletWrapper;

import React from "react";
import { useSideNav } from "../../context/SideNavProvider";
import { useUser } from "../../context/UserContext";
import styled from "styled-components";
import { SideNavbar } from "../Layout";

interface MainContentProps {
  isSideOpen: boolean;
}

const MainContent = styled.div<MainContentProps>`
  min-height: 80vh;
  background-color: #f3f4f6; /* bg-gray-100 */
  transition: all 0.3s ease-in-out;
  width: ${({ isSideOpen }) => (isSideOpen ? "82%" : "92%")};
  margin-left: ${({ isSideOpen }) => (isSideOpen ? "18%" : "8%")};
  z-index: 20;
`;

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
        <SideNavbar />
        <MainContent isSideOpen={isSideOpen}>{children}</MainContent>
      </div>
      <div id="left-space" className="col-span-1 bg-gray-100 z-40" />
    </div>
  );
};

export default OutletWrapper;

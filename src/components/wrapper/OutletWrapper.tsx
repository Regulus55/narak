import React from "react";
import { useSideNav } from "../../context/SideNavProvider";
import { useUser } from "../../context/UserContext";
import styled from "styled-components";
import { SideNavbar } from "../Layout";

interface MainContentProps {
  isSideOpen: boolean;
}

const MainContent = styled.div<MainContentProps>`
  height: 100%;
  background-color: #f3f4f6; /* bg-gray-100 */
  transition: all 0.3s ease-in-out;
  z-index: 20;
  width: ${({ isSideOpen }) => (isSideOpen ? "100%" : "100%")};
  margin-left: ${({ isSideOpen }) => (isSideOpen ? "0%" : "0%")};

  @media (max-width: 768px) {
    // width: ${({ isSideOpen }) => (isSideOpen ? "82%" : "92%")};
    // margin-left: ${({ isSideOpen }) => (isSideOpen ? "18%" : "8%")};

    width: ${({ isSideOpen }) => (isSideOpen ? "90%" : "90%")};
    margin-left: ${({ isSideOpen }) => (isSideOpen ? "10%" : "10%")};
  }
`;

const OutletWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isSideOpen } = useSideNav();
  const { user } = useUser();

  return (
    <div className="w-full pt-16 min-h-[100vh] bg-gray-100">
      <div id="main-space" className="max-w-7xl min-w-[300px] mx-auto z-40">
        <SideNavbar />
        <MainContent isSideOpen={isSideOpen}>{children}</MainContent>
      </div>
    </div>
  );
};

export default OutletWrapper;

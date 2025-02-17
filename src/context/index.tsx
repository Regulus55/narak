// src/context/index.tsx
import React from "react";
import { SideNavProvider } from "./SideNavProvider";
import { UserProvider } from "./UserContext";

const AllContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <UserProvider>
      <SideNavProvider>{children}</SideNavProvider>
    </UserProvider>
  );
};

export default AllContextProvider;

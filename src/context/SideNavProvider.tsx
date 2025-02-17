// src/context/SideNavProvider.tsx
import React, { createContext, useState, ReactNode } from "react";

interface SideNavContextType {
  isSideOpen: boolean;
  setIsSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

interface SideNavProviderProps {
  children: ReactNode;
}

export const SideNavProvider: React.FC<SideNavProviderProps> = ({
  children,
}) => {
  const [isSideOpen, setIsSideOpen] = useState(false);

  return (
    <SideNavContext.Provider value={{ isSideOpen, setIsSideOpen }}>
      {children}
    </SideNavContext.Provider>
  );
};

export const useSideNav = () => {
  const context = React.useContext(SideNavContext);
  if (!context) {
    throw new Error("useSideNav must be used within a SideNavProvider");
  }
  return context;
};

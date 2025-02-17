import React from "react";
import { useSideNav } from "../../context/SideNavProvider";
import { useUser } from "../../context/UserContext";

const OutletWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isSideOpen } = useSideNav();
  const { user } = useUser();

  return (
    <div className="pt-16 min-h-[80vh] bg-gray-100">
      <div className="w-2/3 p-2 min-h-[80vh] mx-auto bg-gray-200">
        <div
          className={`ml-24 transform transition-all duration-300 ease-in-out
                      ${isSideOpen ? "pl-32 translate-x-0" : "pl-0 "}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default OutletWrapper;

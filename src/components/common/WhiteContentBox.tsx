import React, { ReactNode } from "react";

interface WhiteContentBoxProps {
  children: ReactNode;
  className?: string;
}

const WhiteContentBox: React.FC<WhiteContentBoxProps> = ({
  className,
  children,
}) => {
  return (
    <div className={`bg-white rounded-xl m-4 p-4 ${className}`}>{children}</div>
  );
};

export default WhiteContentBox;

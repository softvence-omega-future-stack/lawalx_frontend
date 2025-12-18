import React, { ReactNode } from "react";

// Define the props interface
interface CommonWrapperProps {
  children: ReactNode; // Type for children (can be any valid React node)
  className?: string; // Optional className prop
}

// Define the component
const DashboardWrapper: React.FC<CommonWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`max-w-[1600px] mx-auto my-auto px-2 md:px-4 lg:px-6 ${className}`}>
      {children}
    </div>
  );
};

export default DashboardWrapper;

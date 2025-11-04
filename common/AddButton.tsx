"use client";

import Image from "next/image";
import React from "react";

interface AddButtonProps {
  onClick?: () => void;
  backgroundImage?: string;
  icon?: React.ReactNode;
  text?: string;
}

const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  backgroundImage = "/common/btnBg.png", // default background image
  text = "Add New Device",
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative px-4 py-2 rounded-lg overflow-hidden flex items-center justify-center gap-3 shadow-md transition-transform duration-300 hover:scale-[1.02] bg-gray-800"
    >
      {/* ✅ Always visible background image */}
      <Image
        src={backgroundImage}
        alt="Button Background"
        fill
        className="object-cover absolute inset-0 z-10"
        sizes="100vw"
        priority
      />

      {/* Content */}
      {icon && <div className="text-white">{icon}</div>}
      <span className="text-sm md:text-lg font-semibold text-white drop-shadow-md">
        {text}
      </span>
    </button>
  );
};

export default AddButton;



// Demo usage:
    // <Button
    //   icon={<Box className="w-6 h-6 text-current" />}
    //   text="Add new Device"
    //   />
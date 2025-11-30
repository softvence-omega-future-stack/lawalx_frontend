"use client";

import { ReactNode } from "react";
import { Trash2 } from "lucide-react";

interface ActionButtonProps {
  title?: string;
  icon?: ReactNode;
  bgColor?: string;       // default background color
  hoverColor?: string;    // default hover color
  onClick?: () => void;
  className?: string;     // extra classes
}

const ActionButton = ({
  title = "Delete",
  icon = <Trash2 className="w-5 h-5" />,
  bgColor = "#EF4444",
  hoverColor = "#ff3b30",
  onClick,
  className = "",
}: ActionButtonProps) => {
  return (
    <>
      <style>{`
        .action-btn {
          background: ${bgColor};
          box-shadow: 
            0 1px 2px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.12);
          transition: all 0.15s ease;
          cursor: pointer;
        }

        .action-btn:hover {
          background: ${hoverColor};
        }

        .action-btn:active {
          background: ${hoverColor};
          box-shadow: 
            0 1px 2px rgba(0, 0, 0, 0.2),
            inset 0 2px 4px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      <button
        onClick={onClick}
        className={`action-btn flex items-center gap-2 px-4 py-2 md:py-3 text-white font-medium text-base select-none whitespace-nowrap ${className}`}
      >
        {icon}
        {title}
      </button>
    </>
  );
};

export default ActionButton;

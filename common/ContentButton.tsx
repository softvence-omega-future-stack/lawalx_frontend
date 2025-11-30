"use client";

import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface ContentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  icon?: LucideIcon; // optional icon component
  bgColor?: string;
  hoverColor?: string;
}

const ContentButton = ({
  title,
  icon: Icon,
  className = "",
  style = {},
  bgColor = "#0FA6FF",
  hoverColor = "#00A4FF",
  ...rest
}: ContentButtonProps) => {
  return (
    <>
      <style>{`
        .content-btn {
          background: ${bgColor};
          box-shadow: 
            0 1px 2px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.2),
            inset 0 -2px 4px rgba(0,0,0,0.2);
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.12);
          transition: all 0.15s ease;
          cursor: pointer;
        }

      {title && (
        <span className="text-sm md:text-base font-semibold text-nowrap">{title}</span>
      )}
    </button>
  );
};

export default ContentButton;

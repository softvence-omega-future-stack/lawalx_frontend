"use client";

import Link from "next/link";
import { ChevronRight, House } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm whitespace-nowrap"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {/* Separator */}
            {index !== 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}

            {/* Home (icon only) */}
            {index === 0 && item.label === "Home" && item.href ? (
              <Link
                href={item.href}
                aria-label="Home"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <House className="w-4 h-4" />
              </Link>
            ) : isLast ? (
              /* Active Page */
              <span
                aria-current="page"
                className="text-blue-600 font-medium"
              >
                {item.label}
              </span>
            ) : (
              /* Normal Link */
              <Link
                href={item.href ?? "#"}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;

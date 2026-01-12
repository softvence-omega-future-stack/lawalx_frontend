"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileUp, LayoutTemplate } from "lucide-react";

interface SidebarItem {
    label: string;
    value: string;
    href: string;
    icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
    {
        label: "Uploaded Files",
        value: "uploaded-files",
        href: "/content",
        icon: <FileUp size={20} />
    },
    {
        label: "Template",
        value: "template",
        href: "/content/template",
        icon: <LayoutTemplate size={20} />
    },
];

export default function ContentLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-[200px] shrink-0">
                <nav className="space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href === "/content" && pathname === "/content");

                        return (
                            <Link
                                key={item.value}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${isActive
                                        ? "bg-[#E6F7FF] text-bgBlue font-medium"
                                        : "text-textGray hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <span className={isActive ? "text-bgBlue" : "text-textGray"}>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
                {children}
            </main>
        </div>
    );
}

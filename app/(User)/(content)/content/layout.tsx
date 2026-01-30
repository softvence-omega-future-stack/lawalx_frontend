"use client";

export default function ContentSubLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full">
            {children}
        </div>
    );
}

import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1600px] mx-auto px-2 py-2  sm:px-6 sm:py-6">
      {children}
    </div>
  );
}

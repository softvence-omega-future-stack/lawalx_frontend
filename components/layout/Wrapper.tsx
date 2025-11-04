import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1600px] mx-auto p-6">
      {children}
    </div>
  );
}

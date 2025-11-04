import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return <div className="max-w-8xl mx-auto px-4 md:px-2 py-6">{children}</div>;
}

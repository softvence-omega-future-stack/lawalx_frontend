"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
type DialogHeight = "sm" | "md" | "lg" | "xl";

interface BaseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  /** Predefined width sizes (sm–5xl) */
  maxWidth?: DialogSize;
  /** Predefined height sizes */
  maxHeight?: DialogHeight;
}

/** Map size keys to Tailwind classes */
const widthMap: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
};

const heightMap: Record<DialogHeight, string> = {
  sm: "max-h-[50vh]",
  md: "max-h-[65vh]",
  lg: "max-h-[80vh]",
  xl: "max-h-[90vh]",
};

const BaseDialog = ({
  open,
  setOpen,
  title,
  description,
  children,
  maxWidth = "2xl",
  maxHeight = "lg",
}: BaseDialogProps) => {
  const widthClass = widthMap[maxWidth];
  const heightClass = heightMap[maxHeight];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={`${widthClass} ${heightClass} flex flex-col`}>
        <DialogHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div className="flex-1">
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-1">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 py-2">
          <div className="space-y-4">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BaseDialog;







// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// interface BaseDialogProps {
//   open: boolean
//   setOpen: (open: boolean) => void
//   title: string
//   description: string
//   children: React.ReactNode
//   maxWidth?: string
//   maxHeight?: string
//   showFooter?: boolean
// }

// const BaseDialog = ({
//   open,
//   setOpen,
//   title,
//   description,
//   children,
//   maxWidth = "max-w-2xl",
//   maxHeight = "max-h-[80vh]",
// }: BaseDialogProps) => {
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className={`${maxWidth} ${maxHeight} flex flex-col`}>
//         <DialogHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
//           <div className="flex-1">
//             <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
//             <DialogDescription className="text-sm text-gray-600 mt-1">{description}</DialogDescription>
//           </div>
//         </DialogHeader>
        
//         <div className="flex-1 overflow-y-auto pr-2 py-2">
//           <div className="space-y-4">
//             {children}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default BaseDialog;
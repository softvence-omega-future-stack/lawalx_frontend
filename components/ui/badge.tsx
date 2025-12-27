import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
                success:
                    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
                warning:
                    "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
                error:
                    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
                info:
                    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
                guest:
                    "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
                trial:
                    "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
                pro:
                    "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
                enterprise:
                    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }

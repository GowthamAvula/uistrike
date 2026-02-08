import React, { ReactNode } from "react";
import { clsx } from "clsx";

interface PageProps {
    children: ReactNode;
    className?: string;
}

/**
 * Page Component
 * Implements the requested "Stack Navigator" web styling:
 * - Background: #060B14
 * - Centered content with max-width 1100px
 * - Standard padding
 */
export function Page({ children, className }: PageProps) {
    return (
        <div
            className="flex flex-col items-center min-h-screen w-full"
            style={{ backgroundColor: "#060B14" }}
        >
            <div
                className={clsx("w-full max-w-[1100px] flex-1 px-4 py-4 pt-24", className)}
            // pt-24 accounts for the fixed header height
            >
                {children}
            </div>
        </div>
    );
}

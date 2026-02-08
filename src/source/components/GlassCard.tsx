import React from "react";
import { clsx } from "clsx";
// @ts-ignore
import { motion } from "framer-motion";

type GlassCardProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
};

export function GlassCard({ children, className, onClick, style }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            onClick={onClick}
            style={style}
            className={clsx(
                "rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10",
                "shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
                "hover:bg-white/10 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
                "transition-all duration-300 ease-out",
                className
            )}
        >
            {children}
        </motion.div>
    );
}

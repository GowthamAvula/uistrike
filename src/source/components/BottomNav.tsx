"use client";
import { useState, useEffect } from "react";
// @ts-ignore
import { motion } from "framer-motion";
import { LayoutDashboard, Plane, ShoppingCart } from "lucide-react";
import styles from "./bottom-nav.module.css";
import { clsx } from "clsx";

export type TabType = "dashboard" | "flights" | "market";

interface BottomNavProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <nav className={styles.bottomNav} />; // Render empty nav shell during SSR/initial hydration
    }

    return (
        <nav className={styles.bottomNav}>
            <button
                className={clsx(styles.navItem, activeTab === "dashboard" && styles.isActive)}
                onClick={() => onTabChange("dashboard")}
                aria-label="Home"
                suppressHydrationWarning
            >
                <span className={styles.icon}><LayoutDashboard size={20} /></span>
                <span className={styles.label}>Home</span>
            </button>

            <button
                className={clsx(styles.navItem, activeTab === "flights" && styles.isActive)}
                onClick={() => onTabChange("flights")}
                aria-label="Flights"
                suppressHydrationWarning
            >
                <span className={styles.icon}><Plane size={20} /></span>
                <span className={styles.label}>Flights</span>
            </button>

            <button
                className={clsx(styles.navItem, activeTab === "market" && styles.isActive)}
                onClick={() => onTabChange("market")}
                aria-label="Market"
                suppressHydrationWarning
            >
                <span className={styles.icon}><ShoppingCart size={20} /></span>
                <span className={styles.label}>Market</span>
            </button>
        </nav>
    );
}

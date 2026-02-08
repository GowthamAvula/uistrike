"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Group, Text } from "@mantine/core";
import { User } from "lucide-react";
import styles from "./booking.module.css";
import { DashboardPage } from "./DashboardPage";
import { Marketplace } from "./marketplace"; // Fixed import based on earlier grep
import { BottomNav, TabType } from "./BottomNav";
import { Page } from "./Page";

// New Flight Navi Components
import { FlightSearch } from "@/components/tambo/flight-navi/flight-search";
import { FlightResults, Flight } from "@/components/tambo/flight-navi/flight-results";
import { FlightCustomization } from "@/components/tambo/flight-navi/flight-customization";
import { TravelerDetails, PaymentConfirmation } from "@/components/tambo/flight-navi/traveler-payment";
import { WelcomeScreen } from "@/components/tambo/flight-navi/welcome-screen";

type BookingFlowStep = "welcome" | "search" | "results" | "customize" | "traveler" | "payment" | "success";

export function BookingPage() {
    const [activeTab, setActiveTab] = React.useState<TabType>("flights");
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const storedName = localStorage.getItem("displayName");
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    return (
        <div className={styles.shell} style={{ backgroundColor: "#060B14" }}>
            {activeTab === "dashboard" && <DashboardPage />}
            {activeTab === "market" && <Marketplace />}

            {activeTab === "flights" && (
                <Page>
                    {userName && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[60] opacity-30 select-none">
                            <Group gap="xs">
                                <User size={12} className="text-cyan-400" />
                                <Text size="[10px]" fw={900} className="tracking-[0.4em] uppercase text-white pointer-events-none">
                                    COMMS ACTIVE: {userName}
                                </Text>
                            </Group>
                        </div>
                    )}
                    <BookingContent userName={userName} onNameSet={(name) => {
                        localStorage.setItem("displayName", name);
                        setUserName(name);
                    }} />
                    <TravelFooter />
                </Page>
            )}

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
}

export function BookingContent({ userName, onNameSet }: { userName: string | null, onNameSet: (name: string) => void }) {
    const [step, setStep] = useState<BookingFlowStep>("search");
    const [searchData, setSearchData] = useState<any>(null);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [customizationData, setCustomizationData] = useState<any>(null);

    const handleSearch = (data: any) => {
        setSearchData(data);
        setStep("results");
    };

    const handleSelectFlight = (flight: Flight) => {
        setSelectedFlight(flight);
        setStep("customize");
    };

    const handleConfirmCustomization = (data: any) => {
        setCustomizationData(data);
        setStep("traveler");
    };

    const handleFinish = () => {
        setStep("search");
    };

    return (
        <section className="min-h-screen py-20">
            <AnimatePresence mode="wait">
                {step === "welcome" && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                    >
                        <WelcomeScreen onContinue={(name) => {
                            onNameSet(name);
                            setStep("search");
                        }} />
                    </motion.div>
                )}

                {step === "search" && (
                    <motion.div
                        key="search"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                    >
                        <section className={styles.heroText}>
                            <p className={styles.kicker}>Next‑gen booking experience</p>
                            <h1 className={styles.title}>Explore the World Horizon</h1>
                            <p className={styles.subtitle}>
                                High-resolution flight booking powered by Tambo Sky architecture.
                            </p>
                        </section>
                        <FlightSearch onSearch={handleSearch} />
                    </motion.div>
                )}

                {step === "results" && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <FlightResults onSelect={handleSelectFlight} />
                    </motion.div>
                )}

                {step === "customize" && selectedFlight && (
                    <motion.div
                        key="customize"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FlightCustomization
                            flight={selectedFlight}
                            onBack={() => setStep("results")}
                            onConfirm={handleConfirmCustomization}
                        />
                    </motion.div>
                )}

                {step === "traveler" && (
                    <motion.div
                        key="traveler"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <TravelerDetails
                            passengers={searchData?.passengers}
                            onBack={() => setStep("customize")}
                            onConfirm={() => setStep("payment")}
                        />
                    </motion.div>
                )}

                {step === "payment" && (
                    <motion.div
                        key="payment"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <PaymentConfirmation onFinish={handleFinish} />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export function TravelFooter() {
    return (
        <footer className={styles.footer} suppressHydrationWarning>
            <span>© 2026 Jesko Jets</span>
            <span className={styles.footerSep}>•</span>
            <a className={styles.footerLink} href="#">Privacy</a>
            <a className={styles.footerLink} href="#">Support</a>
        </footer>
    );
}

export function VideoHero() {
    return (
        <div className={styles.videoLayer} aria-hidden="true">
            <video className={styles.video} autoPlay loop muted playsInline preload="auto">
                <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div className={styles.videoOverlay} />
            <div className={styles.grain} />
        </div>
    );
}

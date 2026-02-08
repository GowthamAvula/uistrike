"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Group, Text } from "@mantine/core";
import { User } from "lucide-react";
import { BookingContent, VideoHero, TravelFooter } from "@/source/components/BookingPage";
import { BottomNav, TabType } from "@/source/components/BottomNav";
import { DashboardPage } from "@/source/components/DashboardPage";
import { Marketplace } from "@/source/components/marketplace";
import { MessageThreadCollapsible } from "../source/components/message-thread-collapsible";

import { AuroraBackground } from "@/source/components/AuroraBackground";
import { LandingPage } from "@/source/components/LandingPage";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("flights");
  const [showLanding, setShowLanding] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("displayName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleNameSet = (name: string) => {
    localStorage.setItem("displayName", name);
    setUserName(name);
  };

  if (showLanding) {
    return (
      <LandingPage onEnter={(target) => {
        if (target) setActiveTab(target as TabType);
        setShowLanding(false);
      }} />
    );
  }

  const renderBackground = () => {
    if (activeTab === "flights") {
      return <VideoHero />;
    }
    return <AuroraBackground />;
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardPage key="dashboard" />;
      case "flights":
        return <BookingContent key="flights" userName={userName} onNameSet={handleNameSet} />;
      case "market":
        return <Marketplace key="market" />;
      default:
        return <BookingContent key="flights" userName={userName} onNameSet={handleNameSet} />;
    }
  };

  return (
    <div className="min-h-screen relative text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      {/* Context-Aware Background Shell */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab === "flights" ? "flight-video" : "aurora-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {renderBackground()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {userName && activeTab === "flights" && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[60] opacity-30 select-none">
            <Group gap="xs">
              <User size={12} className="text-cyan-400" />
              <Text size="[10px]" fw={900} className="tracking-[0.4em] uppercase text-white pointer-events-none">
                COMMS ACTIVE: {userName}
              </Text>
            </Group>
          </div>
        )}

        <main className="flex-1 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <TravelFooter />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <MessageThreadCollapsible />

      <style jsx global>{`
                /* Ensure components fit into the shared shell */
                main {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                /* Override backgrounds if necessary */
                .marketplace, .command-center {
                   background: transparent !important;
                }
                
                /* Custom scrollbar for premium feel */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
    </div>
  );
}

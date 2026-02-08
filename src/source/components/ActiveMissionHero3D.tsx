"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { LedGlobe } from "./LedGlobe";
import { FlightArcStrands } from "./FlightArcStrands";

export default function ActiveMissionHero3D() {
    return (
        <Canvas
            camera={{ position: [0, 0.18, 3.45], fov: 44 }}
            dpr={[1, 1.5]}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
            }}
        >
            <ambientLight intensity={0.3} />
            <directionalLight position={[3, 4, 2]} intensity={1.1} color={"#c8e7ff"} />
            <pointLight position={[-4, -1, 3]} intensity={0.55} color={"#ffcc66"} />

            <Environment preset="city" environmentIntensity={0.22} />

            {/* LED globe */}
            <LedGlobe radius={1.05} dots={14000} />

            {/* Multi-strand arc + moving pulse */}
            <FlightArcStrands arc={{ from: [37.6213, -122.379], to: [25.2532, 55.3657] }} />

            {/* Sparse elegant dust */}
            <Sparkles
                count={55}
                speed={0.18}
                opacity={0.22}
                size={1.0}
                scale={[5.2, 2.6, 2.6]}
                color="#bffcff"
            />

            <EffectComposer multisampling={0}>
                <Bloom intensity={0.7} luminanceThreshold={0.18} luminanceSmoothing={0.9} />
            </EffectComposer>
        </Canvas>
    );
}

"use client";

import Image from "next/image";
import SnowParticles from "./components/SnowParticles";
import Navbar from "./components/Navbar";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";
import { SpotlightText } from "./components/SpotlightText";
import SkillsGrid from "./components/SkillsGrid";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Beams absolute layer */}
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
        <BackgroundBeamsWithCollision />
      </div>
      <div className="absolute inset-0 pointer-events-none z-0">
        <SnowParticles />
      </div>
      {/* Main Content */}
      <main className="w-full flex flex-col items-center justify-center py-16 px-4 relative z-10 bg-transparent">
        <Navbar />
        {/* Top-left logo and text */}
        <div className="fixed top-6 left-6 z-30 flex items-center space-x-3 pointer-events-auto select-none bg-[#101c2c]/80 border border-[#8DD8FF] rounded-xl px-3 py-1 shadow-lg backdrop-blur-md">
          <Image src="/images/logo.jpg" alt="Logo" width={24} height={24} className="rounded-xl" />
          <span className="text-lg font-extrabold text-blue-100 tracking-widest select-none">マンヅ</span>
        </div>
        {/* Centered Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center w-full space-y-3">
          <SpotlightText />
        </section>
        {/* Skills Section */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-100 to-white tracking-tight mb-8">
            Skills
          </h2>
          <SkillsGrid />
        </section>
      </main>
    </div>
  );
}

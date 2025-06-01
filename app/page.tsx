"use client";

import { SpotlightText } from "./components/SpotlightText";
import SkillsGrid from "./components/SkillsGrid";
import AboutMeSection from "./components/AboutSection";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center py-16 px-4 relative z-10 bg-transparent">
      {/* Centered Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center w-full space-y-3">
        <SpotlightText />
      </section>
      {/* About Me Section */}
      <AboutMeSection />
      {/* Skills Section */}
      <section id="skills" className="min-h-screen w-full flex flex-col items-center justify-center pt-24">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-100 to-white tracking-tight mb-8">
          Skills
        </h2>
        <SkillsGrid />
      </section>
    </main>
  );
}

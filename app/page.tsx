"use client";

import { SpotlightText } from "./components/SpotlightText";
import SkillsGrid from "./components/SkillsGrid";
import AboutMeSection from "./components/AboutSection";
import SocialSection from "./components/SocialSection";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center py-8 sm:py-16 px-4 relative">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center w-full space-y-3"
        aria-label="Hero section"
      >
        <SpotlightText />
      </section>
      
      {/* About Me Section */}
      <section aria-label="About me section">
        <AboutMeSection />
      </section>
      
      {/* Skills Section */}
      <section 
        id="skills" 
        className="min-h-screen w-full flex flex-col items-center justify-center pt-16 sm:pt-24"
        aria-label="Skills section"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-100 to-white tracking-tight mb-6 sm:mb-8 text-center">
          Tech Stack
        </h2>
        <SkillsGrid />
      </section>
      
      {/* Social Section */}
      <SocialSection />
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { FaRocket, FaCode, FaStar, FaHammer, FaGithub } from "react-icons/fa";
import { Spotlight } from "../components/ui/spotlight-new";
import { useEffect, useState } from "react";
import { useAnimate, stagger } from "framer-motion";

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>{text}</span>
  );
}

function TypingEffect({ text, className = "" }: { text: string; className?: string }) {
  const [scope, animate] = useAnimate();
  const wordsArray = text.split(" ");
  useEffect(() => {
    if (scope.current) {
      animate(
        "span",
        { opacity: 1, filter: "blur(0px)" },
        { duration: 0.5, delay: stagger(0.08) }
      );
    }
  }, [scope, animate]);
  return (
    <motion.div ref={scope} className={className}>
      {wordsArray.map((word: string, idx: number) => (
        <motion.span
          key={word + idx}
          className="text-cyan-100 opacity-0"
          style={{ filter: "blur(10px)" }}
        >
          {word} {" "}
        </motion.span>
      ))}
    </motion.div>
  );
}

const FUN_FACTS = [
  "Did you know? The first website ever made is still online!",
  "Fun fact: JavaScript was created in just 10 days.",
  "Easter egg: Try pressing Alt+F4 😉",
  "Next.js makes SSR super easy!",
  "You are awesome for visiting this page!",
];

export default function ProjectsPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [funFact, setFunFact] = useState("");
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setFunFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
  }, []);

  return (
    <main className="w-full flex flex-col items-center justify-center py-8 sm:py-16 px-4 relative min-h-screen">
      {!isMobile && (
        <Spotlight
          width={600}
          height={800}
          smallWidth={300}
          translateY={-100}
          xOffset={0}
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 60%, transparent 100%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .01) 0, hsla(210, 100%, 55%, .008) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .005) 0, hsla(210, 100%, 45%, .003) 80%, transparent 100%)"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-16 sm:mt-24 w-full max-w-4xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="p-3 bg-gradient-to-r from-[#8DD8FF]/20 to-[#5ab7d8]/20 rounded-xl backdrop-blur-sm border border-[#8DD8FF]/30">
            <FaCode className="w-8 h-8 text-[#8DD8FF]" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-100 to-white tracking-tight">
            My Projects
          </h1>
          <div className="p-3 bg-gradient-to-r from-[#8DD8FF]/20 to-[#5ab7d8]/20 rounded-xl backdrop-blur-sm border border-[#8DD8FF]/30">
            <FaRocket className="w-8 h-8 text-[#8DD8FF]" />
          </div>
        </motion.div>

        <div className="flex justify-center mb-6">
          <span className="text-[5rem] md:text-[7rem] animate-float">🚧</span>
        </div>

        <div className="mb-2">
          <GlitchText text="Coming Soon" className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-100" />
        </div>
        <div className="mb-4">
          <TypingEffect text="Exciting projects are under construction!" className="text-xl sm:text-2xl font-semibold text-cyan-100" />
        </div>

        <div className="flex justify-center mb-6">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 border border-cyan-300/40 text-cyan-200 font-bold animate-pulse-glow shadow-lg neon-badge">IN PROGRESS</span>
        </div>
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-blue-100/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
        >
          I'm currently working on some exciting projects that will showcase my skills and creativity. 
          Stay tuned for amazing web applications, tools, and innovative solutions!
        </motion.p>

        <div className="w-full max-w-md mx-auto mb-6">
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "50%" }}
              transition={{ duration: 2, delay: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative animate-pulse-glow"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
            </motion.div>
          </div>
          <p className="text-cyan-100/70 text-sm mt-2 text-center">Projects are 50% ready for showcase</p>
        </div>

        <div className="mb-8 text-center">
          <span className="inline-block px-4 py-2 bg-cyan-900/40 rounded-xl text-cyan-200 font-mono text-sm animate-float shadow-lg">{funFact}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <a
            href="/social"
            className="px-8 py-4 bg-gradient-to-r from-[#8DD8FF]/30 to-[#5ab7d8]/30 hover:from-[#8DD8FF]/50 hover:to-[#5ab7d8]/50 text-[#8DD8FF] rounded-xl transition-all duration-300 font-semibold border border-[#8DD8FF]/30 hover:border-[#8DD8FF]/50 backdrop-blur-sm group-hover:scale-110 animate-float"
          >
            Follow My Journey
          </a>
          <a
            href="https://github.com/Manzzzx"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 font-semibold border border-white/20 hover:border-white/30 backdrop-blur-sm group-hover:scale-110 animate-float"
          >
            View GitHub
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 text-sm flex items-center justify-center gap-2">
            <span>❄️</span>
            <span>Great things take time to build</span>
            <span>❄️</span>
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
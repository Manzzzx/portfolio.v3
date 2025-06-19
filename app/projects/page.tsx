"use client";

import { motion } from "framer-motion";
import { FaRocket, FaCode, FaStar, FaHammer, FaGithub } from "react-icons/fa";
import { Spotlight } from "../components/ui/spotlight-new";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="w-full flex flex-col items-center justify-center py-8 sm:py-16 px-4 relative min-h-screen">
      {/* Background Spotlight Effect */}
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
        {/* Header */}
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

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#101c2c]/60 border-2 border-[#8DD8FF]/50 rounded-3xl p-12 sm:p-16 backdrop-blur-md hover:border-[#8DD8FF] transition-all duration-500 group relative overflow-hidden"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8DD8FF]/5 via-transparent to-[#5ab7d8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating Icons */}
          <div className="absolute top-8 left-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaHammer className="w-8 h-8 text-[#8DD8FF]" />
            </motion.div>
          </div>
          
          <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <FaStar className="w-6 h-6 text-cyan-300" />
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-12 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <FaGithub className="w-7 h-7 text-blue-300" />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0.4 }}
              className="w-24 h-24 bg-gradient-to-br from-[#8DD8FF]/20 to-[#5ab7d8]/20 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-[#8DD8FF]/30 group-hover:scale-110 transition-transform duration-300"
            >
              <FaHammer className="w-12 h-12 text-[#8DD8FF]" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-cyan-100 transition-colors duration-300"
            >
              Coming Soon
            </motion.h2>

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

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto"
            >
              {[
                "Modern Web Applications",
                "Creative UI/UX Designs", 
                "Full-Stack Solutions",
                "Open Source Projects"
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300"
                >
                  <div className="w-2 h-2 bg-[#8DD8FF] rounded-full animate-pulse" />
                  <span className="text-white/90 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="/social"
                className="px-8 py-4 bg-gradient-to-r from-[#8DD8FF]/20 to-[#5ab7d8]/20 hover:from-[#8DD8FF]/30 hover:to-[#5ab7d8]/30 text-[#8DD8FF] rounded-xl transition-all duration-300 font-semibold border border-[#8DD8FF]/30 hover:border-[#8DD8FF]/50 backdrop-blur-sm group-hover:scale-105"
              >
                Follow My Journey
              </a>
              <a
                href="https://github.com/Manzzzx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 font-semibold border border-white/20 hover:border-white/30 backdrop-blur-sm group-hover:scale-105"
              >
                View GitHub
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mt-12 p-6 bg-[#101c2c]/40 border border-[#8DD8FF]/30 rounded-2xl backdrop-blur-md max-w-md mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-white font-semibold">Currently in Development</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 2, delay: 1.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#8DD8FF] to-[#5ab7d8] rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
            </motion.div>
          </div>
          <p className="text-blue-100/60 text-sm mt-2 text-center">
            Projects are 45% ready for showcase
          </p>
        </motion.div>

        {/* Footer Message */}
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
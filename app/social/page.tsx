"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";
import { Spotlight } from "../components/ui/spotlight-new";
import { useEffect, useState } from "react";
import { SOCIAL_LINKS } from "@/lib/constant";

interface SocialCardProps {
  icon: React.ReactNode;
  title: string;
  username: string;
  description: string;
  link: string;
  gradient: string;
  hoverColor: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  instagram: <FaInstagram />,
  discord: <FaDiscord />,
};

const GRADIENT_MAP: Record<string, string> = {
  github: "bg-gradient-to-br from-gray-600 to-gray-800",
  instagram: "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500",
  discord: "bg-gradient-to-br from-indigo-500 to-purple-600",
};

const HOVER_COLOR_MAP: Record<string, string> = {
  github: "text-gray-300 group-hover:text-white",
  instagram: "text-pink-300 group-hover:text-pink-200",
  discord: "text-indigo-300 group-hover:text-indigo-200",
};

const USERNAME_MAP: Record<string, string> = {
  github: "Manzzzx",
  instagram: "manzzzx",
  discord: "manzzzx",
};

const SocialCard: React.FC<SocialCardProps> = ({
  icon,
  title,
  username,
  description,
  link,
  gradient,
  hoverColor
}) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`relative overflow-hidden rounded-2xl border bg-[#101c2c]/40 backdrop-blur-md p-8 h-full transition-all duration-300 border-[#8dd8ff]/60 hover:border-[#8dd8ff] hover:bg-[#101c2c]/60`}>
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient}`} />
        <div className={`mb-6 text-4xl ${hoverColor} transition-all duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-blue-200/80 font-medium mb-3">
            @{username}
          </p>
          <p className="text-neutral-300 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
      </div>
    </motion.a>
  );
};

export default function SocialPage() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const socialLinks = SOCIAL_LINKS.map((item) => ({
    icon: ICON_MAP[item.icon] || <FaGithub />,
    title: item.name,
    username: USERNAME_MAP[item.icon] || "-",
    description: " ",
    link: item.url,
    gradient: GRADIENT_MAP[item.icon] || "",
    hoverColor: HOVER_COLOR_MAP[item.icon] || "text-gray-300 group-hover:text-white",
  }));

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 relative">
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
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-40 to-neutral-200 mb-4">
          Let&apos;s Connect
        </h1>
        <p className="text-blue-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
          Find me across different platforms and let&apos;s build something amazing together.
          Whether it&apos;s code, creativity, or just a friendly chat!
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        {socialLinks.map((social, index) => (
          <motion.div
            key={social.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <SocialCard {...social} />
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="mt-16 text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-neutral-400 text-sm">
          ❄️ Always open to new opportunities and collaborations ❄️
        </p>
      </motion.div>
    </main>
  );
}
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";
import Link from "next/link";

interface SocialLinkProps {
  icon: React.ReactNode;
  title: string;
  link: string;
  hoverColor: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, title, link, hoverColor }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-[#101c2c]/40 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#101c2c]/60"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`text-2xl ${hoverColor} transition-all duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <span className="text-white font-medium group-hover:text-blue-200 transition-colors duration-300">
        {title}
      </span>
    </motion.a>
  );
};

export default function SocialSection() {
  const socialLinks = [
    {
      icon: <FaGithub />,
      title: "GitHub",
      link: "https://github.com",
      hoverColor: "text-gray-300 group-hover:text-white"
    },
    {
      icon: <FaInstagram />,
      title: "Instagram",
      link: "https://instagram.com",
      hoverColor: "text-pink-300 group-hover:text-pink-200"
    },
    {
      icon: <FaDiscord />,
      title: "Discord",
      link: "https://discord.com",
      hoverColor: "text-indigo-300 group-hover:text-indigo-200"
    }
  ];

  return (
    <section 
      id="social"
      className="min-h-screen w-full flex flex-col items-center justify-center pt-16 sm:pt-24"
      aria-label="Social media section"
    >
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-100 to-white tracking-tight mb-4">
          Let&apos;s Connect
        </h2>
        <p className="text-blue-200/80 max-w-lg mx-auto">
          Find me on these platforms and let&apos;s build something amazing together!
        </p>
      </motion.div>
      
      <div className="flex flex-col sm:flex-row gap-6 max-w-2xl w-full px-4">
        {socialLinks.map((social, index) => (
          <motion.div
            key={social.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <SocialLink {...social} />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Link 
          href="/social"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-200/20 bg-blue-200/5 text-blue-200 hover:bg-blue-200/10 hover:border-blue-200/30 transition-all duration-300"
        >
          View All
          <span className="text-sm">→</span>
        </Link>
      </motion.div>
    </section>
  );
}
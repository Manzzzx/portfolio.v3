"use client";

import { motion } from "framer-motion";
import { FaCode, FaRocket, FaTools } from "react-icons/fa";

const ComingSoonCard = ({ icon: Icon, title, description, index }: { 
  icon: React.ComponentType<{ size?: number; className?: string }>; 
  title: string; 
  description: string; 
  index: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-[#101c2c]/60 border border-[#8DD8FF]/50 rounded-xl p-6 backdrop-blur-md hover:border-[#b7e3ff] transition-all duration-300 group"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-[#8DD8FF]/10 rounded-full group-hover:bg-[#8DD8FF]/20 transition-colors duration-300">
        <Icon size={32} className="text-[#8DD8FF]" />
      </div>
      <h3 className="text-xl font-bold text-blue-100">{title}</h3>
      <p className="text-blue-50/70 text-sm leading-relaxed">{description}</p>
      <div className="flex items-center space-x-2 text-xs text-[#8DD8FF]/80">
        <div className="w-2 h-2 bg-[#8DD8FF] rounded-full animate-pulse"></div>
        <span>Coming Soon</span>
      </div>
    </div>
  </motion.div>
);

export default function ProjectsPage() {
  return (
    <main className="w-full flex flex-col items-center justify-center py-8 sm:py-16 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-16 sm:mt-24 w-full max-w-6xl"
      >
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-100 to-white tracking-tight mb-4">
            My Projects
          </h1>
          <p className="text-blue-50/80 text-lg max-w-2xl mx-auto">
            Exciting projects are currently in development. Stay tuned for amazing creations!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ComingSoonCard
            icon={FaCode}
            title="Web Applications"
            description="Modern web applications built with cutting-edge technologies and best practices."
            index={0}
          />
          
          <ComingSoonCard
            icon={FaRocket}
            title="Mobile Apps"
            description="Cross-platform mobile applications with intuitive user interfaces and smooth performance."
            index={1}
          />
          
          <ComingSoonCard
            icon={FaTools}
            title="Developer Tools"
            description="Useful tools and utilities to enhance developer productivity and workflow."
            index={2}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-[#101c2c]/40 border border-[#8DD8FF]/30 rounded-2xl p-8 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-blue-100 mb-4">🚀 Projects in Development</h3>
            <p className="text-blue-50/70 mb-6 max-w-2xl mx-auto">
              Im currently working on several exciting projects that will showcase my skills and creativity. 
              Each project is being crafted with attention to detail and modern development practices.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-[#8DD8FF]/80">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Planning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>Testing</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
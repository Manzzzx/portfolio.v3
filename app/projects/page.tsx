"use client";

import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main className="w-full flex flex-col items-center justify-center py-16 px-4 relative z-10 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-24 w-full max-w-6xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-100 to-white tracking-tight mb-8">
          My Projects
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Card 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#101c2c]/80 border border-[#8DD8FF] rounded-xl p-5 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-blue-100 mb-2">Project 1</h3>
            <p className="text-blue-50/80">Description of your amazing project goes here.</p>
          </motion.div>
          
          {/* Project Card 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#101c2c]/80 border border-[#8DD8FF] rounded-xl p-5 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-blue-100 mb-2">Project 2</h3>
            <p className="text-blue-50/80">Description of your amazing project goes here.</p>
          </motion.div>
          
          {/* Project Card 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#101c2c]/80 border border-[#8DD8FF] rounded-xl p-5 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-blue-100 mb-2">Project 3</h3>
            <p className="text-blue-50/80">Description of your amazing project goes here.</p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
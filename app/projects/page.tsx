"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaRocket, FaCode, FaStar } from "react-icons/fa";
import ProjectCard from "../components/ProjectCard";
import ProjectFilters, { FilterCategory, FilterStatus } from "../components/ProjectFilters";
import { projects, getProjectCounts, filterProjects } from "../data/projects";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All");
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("All");

  const projectCounts = useMemo(() => getProjectCounts(), []);
  const filteredProjects = useMemo(() => 
    filterProjects(selectedCategory, selectedStatus), 
    [selectedCategory, selectedStatus]
  );

  const featuredProjects = projects.filter(project => project.featured);
  const completedProjects = projects.filter(project => project.status === "Completed");
  const inProgressProjects = projects.filter(project => project.status === "In Progress");

  return (
    <main className="w-full flex flex-col items-center justify-center py-8 sm:py-16 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-16 sm:mt-24 w-full max-w-7xl"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-3 mb-6"
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
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-blue-50/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Explore my collection of projects showcasing modern web development, 
            creative problem-solving, and technical expertise across various technologies.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="bg-[#101c2c]/40 border border-[#8DD8FF]/30 rounded-xl px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <FaCode className="w-5 h-5 text-[#8DD8FF]" />
                <span className="text-2xl font-bold text-white">{projects.length}</span>
                <span className="text-blue-100/80">Total Projects</span>
              </div>
            </div>
            
            <div className="bg-[#101c2c]/40 border border-green-400/30 rounded-xl px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-400 rounded-full"></div>
                <span className="text-2xl font-bold text-white">{completedProjects.length}</span>
                <span className="text-blue-100/80">Completed</span>
              </div>
            </div>
            
            <div className="bg-[#101c2c]/40 border border-yellow-400/30 rounded-xl px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                <span className="text-2xl font-bold text-white">{inProgressProjects.length}</span>
                <span className="text-blue-100/80">In Progress</span>
              </div>
            </div>
            
            <div className="bg-[#101c2c]/40 border border-yellow-400/30 rounded-xl px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <FaStar className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">{featuredProjects.length}</span>
                <span className="text-blue-100/80">Featured</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ProjectFilters
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
            projectCounts={projectCounts}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="bg-[#101c2c]/40 border border-[#8DD8FF]/30 rounded-2xl p-12 backdrop-blur-md max-w-md mx-auto">
              <div className="w-20 h-20 bg-[#8DD8FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCode className="w-10 h-10 text-[#8DD8FF]/60" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
              <p className="text-blue-100/70 mb-6">
                No projects match your current filter criteria. Try adjusting your filters or check back later for new projects.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedStatus("All");
                }}
                className="px-6 py-3 bg-[#8DD8FF]/20 hover:bg-[#8DD8FF]/30 text-[#8DD8FF] rounded-xl transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center pt-16 border-t border-white/10"
        >
          <div className="bg-[#101c2c]/40 border border-[#8DD8FF]/30 rounded-2xl p-8 backdrop-blur-md max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Interested in Collaboration?</h3>
            <p className="text-blue-100/70 mb-6 leading-relaxed">
              I'm always excited to work on new projects and collaborate with fellow developers. 
              Whether you have an idea for a project or want to contribute to existing ones, let's connect!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/social"
                className="px-6 py-3 bg-[#8DD8FF]/20 hover:bg-[#8DD8FF]/30 text-[#8DD8FF] rounded-xl transition-colors font-medium"
              >
                Get in Touch
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
              >
                View GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
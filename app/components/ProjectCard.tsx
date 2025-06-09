"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCode, 
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaEye,
  FaPlay,
  FaExpand
} from "react-icons/fa";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiPython,
  SiDocker
} from "react-icons/si";
import Image from "next/image";

// Technology icon mapping
const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  "MongoDB": SiMongodb,
  "Express": SiExpress,
  "Python": SiPython,
  "Docker": SiDocker,
};

// Technology colors
const techColors: Record<string, string> = {
  "React": "text-[#61DAFB]",
  "Next.js": "text-white",
  "TypeScript": "text-[#3178C6]",
  "JavaScript": "text-[#F7DF1E]",
  "Tailwind CSS": "text-[#06B6D4]",
  "Node.js": "text-[#339933]",
  "MongoDB": "text-[#47A248]",
  "Express": "text-white",
  "Python": "text-[#3776AB]",
  "Docker": "text-[#2496ED]",
};

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: "Web App" | "Mobile App" | "API" | "Tool" | "Game";
  status: "Completed" | "In Progress" | "Planning";
  featured: boolean;
  stats?: {
    stars?: number;
    forks?: number;
    views?: number;
    commits?: number;
  };
  timeline: {
    started: string;
    completed?: string;
    duration: string;
  };
  features: string[];
  challenges?: string[];
  learnings?: string[];
  teamSize?: number;
  role?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const statusColors = {
    "Completed": "bg-green-500/20 text-green-300 border-green-500/30",
    "In Progress": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "Planning": "bg-blue-500/20 text-blue-300 border-blue-500/30"
  };

  const categoryColors = {
    "Web App": "bg-purple-500/20 text-purple-300",
    "Mobile App": "bg-pink-500/20 text-pink-300",
    "API": "bg-orange-500/20 text-orange-300",
    "Tool": "bg-cyan-500/20 text-cyan-300",
    "Game": "bg-red-500/20 text-red-300"
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group relative bg-[#101c2c]/60 border border-[#8DD8FF]/50 rounded-2xl overflow-hidden backdrop-blur-md hover:border-[#8DD8FF] transition-all duration-300"
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaStar className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
            {project.status}
          </div>
        </div>

        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#8DD8FF]/20 to-[#5ab7d8]/20 animate-pulse" />
          )}
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.demoUrl && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDemo(true)}
                className="p-3 bg-[#8DD8FF]/20 hover:bg-[#8DD8FF]/30 rounded-full backdrop-blur-sm border border-[#8DD8FF]/50 text-white"
                title="View Demo"
              >
                <FaPlay className="w-4 h-4" />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(true)}
              className="p-3 bg-[#8DD8FF]/20 hover:bg-[#8DD8FF]/30 rounded-full backdrop-blur-sm border border-[#8DD8FF]/50 text-white"
              title="View Details"
            >
              <FaExpand className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#8DD8FF] transition-colors">
                  {project.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[project.category]}`}>
                  {project.category}
                </span>
              </div>
              <p className="text-blue-100/80 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => {
              const Icon = techIcons[tech];
              const colorClass = techColors[tech];
              
              return (
                <div
                  key={tech}
                  className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
                  title={tech}
                >
                  {Icon && <Icon className={`w-3 h-3 ${colorClass}`} />}
                  <span className="text-xs text-white/80">{tech}</span>
                </div>
              );
            })}
            {project.technologies.length > 4 && (
              <div className="px-2 py-1 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <span className="text-xs text-white/60">+{project.technologies.length - 4}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          {project.stats && (
            <div className="flex items-center gap-4 mb-4 text-xs text-white/60">
              {project.stats.stars !== undefined && (
                <div className="flex items-center gap-1">
                  <FaStar className="w-3 h-3" />
                  <span>{project.stats.stars}</span>
                </div>
              )}
              {project.stats.views !== undefined && (
                <div className="flex items-center gap-1">
                  <FaEye className="w-3 h-3" />
                  <span>{project.stats.views}</span>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-1">
                  <FaUsers className="w-3 h-3" />
                  <span>{project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}</span>
                </div>
              )}
            </div>
          )}

          {/* Timeline */}
          <div className="flex items-center gap-2 mb-6 text-xs text-white/60">
            <FaCalendarAlt className="w-3 h-3" />
            <span>{project.timeline.started}</span>
            <span>•</span>
            <span>{project.timeline.duration}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white text-sm font-medium"
              >
                <FaGithub className="w-4 h-4" />
                Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#8DD8FF]/20 hover:bg-[#8DD8FF]/30 rounded-lg transition-colors text-[#8DD8FF] text-sm font-medium"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <ProjectModal 
            project={project} 
            onClose={() => setIsExpanded(false)} 
          />
        )}
      </AnimatePresence>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && project.demoUrl && (
          <DemoModal 
            project={project} 
            onClose={() => setShowDemo(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Project Modal Component
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#101c2c]/95 border border-[#8DD8FF]/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-blue-100/80 text-lg">{project.longDescription}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Project Image */}
          <div className="relative h-64 mb-8 rounded-xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-blue-100/80">
                    <span className="text-[#8DD8FF] mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => {
                  const Icon = techIcons[tech];
                  const colorClass = techColors[tech];
                  
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
                    >
                      {Icon && <Icon className={`w-4 h-4 ${colorClass}`} />}
                      <span className="text-sm text-white/80">{tech}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Challenges & Learnings */}
          {(project.challenges || project.learnings) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {project.challenges && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Challenges</h3>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2 text-blue-100/80">
                        <span className="text-red-400 mt-1">⚡</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.learnings && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Key Learnings</h3>
                  <ul className="space-y-2">
                    {project.learnings.map((learning, index) => (
                      <li key={index} className="flex items-start gap-2 text-blue-100/80">
                        <span className="text-green-400 mt-1">💡</span>
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white font-medium"
              >
                <FaGithub className="w-5 h-5" />
                View Source Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#8DD8FF]/20 hover:bg-[#8DD8FF]/30 rounded-lg transition-colors text-[#8DD8FF] font-medium"
              >
                <FaExternalLinkAlt className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Demo Modal Component
const DemoModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#101c2c]/95 border border-[#8DD8FF]/50 rounded-2xl max-w-6xl w-full h-[80vh] backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Live Demo - {project.title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Demo Frame */}
          <div className="flex-1 rounded-xl overflow-hidden border border-white/20">
            <iframe
              src={project.demoUrl}
              className="w-full h-full"
              title={`${project.title} Demo`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
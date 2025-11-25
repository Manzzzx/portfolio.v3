/**
 * Project Card Component
 * 
 * Card component untuk menampilkan project preview.
 * Refactored dari single 471-line file menjadi modular components.
 * 
 * @module app/components/projects/ProjectCard
 * 
 * Usage:
 * ```tsx
 * import ProjectCard from '@/app/components/projects/ProjectCard';
 * 
 * <ProjectCard project={projectData} index={0} />
 * ```
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaEye,
  FaPlay,
  FaExpand
} from "react-icons/fa";
import Image from "next/image";
import type { Project } from "@/lib/types/project.types";
import { getStatusClassName, getCategoryClassName } from "@/lib/config/theme.config";
import { getTechIconWithColor } from "@/lib/config/tech-icons.config";
import ProjectModal from "./ProjectModal";
import DemoModal from "./DemoModal";

/**
 * ProjectCard Props
 */
interface ProjectCardProps {
  /** Project data object */
  project: Project;
  /** Index untuk staggered animation */
  index: number;
}

/**
 * ProjectCard Component
 * 
 * Menampilkan project card dengan:
 * - Project image dengan hover overlay
 * - Title, description, dan category badge
 * - Technology stack icons
 * - Project stats (stars, views, team size)
 * - Timeline information
 * - Action buttons (GitHub, Demo)
 * - Modal untuk detail view
 * 
 * @param project - Project data
 * @param index - Index untuk animation delay
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

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
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusClassName(project.status)}`}>
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
          
          {/* Hover Overlay with Action Buttons */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.demoUrl && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDemo(true)}
                className="p-3 bg-[#8DD8FF]/20 hover:bg-[#8DD8FF]/30 rounded-full backdrop-blur-sm border border-[#8DD8FF]/50 text-white"
                title="View Demo"
                aria-label="View project demo"
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
              aria-label="View project details"
            >
              <FaExpand className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Title and Category */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#8DD8FF] transition-colors">
                  {project.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryClassName(project.category)}`}>
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
              const { Icon, colorClass } = getTechIconWithColor(tech);
              
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
                <div className="flex items-center gap-1" title="GitHub Stars">
                  <FaStar className="w-3 h-3" />
                  <span>{project.stats.stars}</span>
                </div>
              )}
              {project.stats.views !== undefined && (
                <div className="flex items-center gap-1" title="Views">
                  <FaEye className="w-3 h-3" />
                  <span>{project.stats.views}</span>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-1" title="Team Size">
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white text-sm font-medium"
                aria-label="View source code on GitHub"
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
                aria-label="View live demo"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      {isExpanded && (
        <ProjectModal 
          project={project} 
          onClose={() => setIsExpanded(false)} 
        />
      )}

      {showDemo && project.demoUrl && (
        <DemoModal 
          project={project} 
          onClose={() => setShowDemo(false)} 
        />
      )}
    </>
  );
};

export default ProjectCard;

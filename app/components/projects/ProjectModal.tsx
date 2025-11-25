/**
 * Project Detail Modal Component
 * 
 * Modal untuk menampilkan detail lengkap dari project.
 * Extracted dari ProjectCard.tsx untuk better code organization.
 * 
 * @module app/components/projects/ProjectModal
 * 
 * Usage:
 * ```tsx
 * import ProjectModal from '@/app/components/projects/ProjectModal';
 * 
 * {isOpen && (
 *   <ProjectModal project={projectData} onClose={() => setIsOpen(false)} />
 * )}
 * ```
 */

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import type { Project } from "@/lib/types/project.types";
import { getTechIconWithColor } from "@/lib/config/tech-icons.config";

/**
 * ProjectModal Props
 */
interface ProjectModalProps {
  /** Project data to display */
  project: Project;
  /** Callback function when modal is closed */
  onClose: () => void;
}

/**
 * ProjectModal Component
 * 
 * Full-screen modal yang menampilkan:
 * - Project image
 * - Detailed description
 * - Complete technology stack
 * - Key features list
 * - Challenges faced (optional)
 * - Key learnings (optional)
 * - Action buttons (GitHub, Demo)
 * 
 * Modal dapat ditutup dengan:
 * - Click tombol close (✕)
 * - Click di luar modal (backdrop)
 * - Press ESC key (handled by AnimatePresence)
 * 
 * @param project - Project data object
 * @param onClose - Function to call when closing modal
 */
const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
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
                <h2 id="modal-title" className="text-3xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-blue-100/80 text-lg">
                  {project.longDescription}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                aria-label="Close modal"
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

            {/* Features and Technologies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Key Features */}
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

              {/* Technologies Used */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => {
                    const { Icon, colorClass } = getTechIconWithColor(tech);
                    
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

            {/* Challenges and Learnings (Optional) */}
            {(project.challenges || project.learnings) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Challenges */}
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

                {/* Key Learnings */}
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

            {/* Action Buttons */}
            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white font-medium"
                  aria-label="View source code on GitHub"
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
                  aria-label="View live demo"
                >
                  <FaExternalLinkAlt className="w-5 h-5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;

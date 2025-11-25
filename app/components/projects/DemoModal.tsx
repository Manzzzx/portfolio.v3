/**
 * Demo Modal Component
 * 
 * Modal untuk menampilkan live demo project dalam iframe.
 * Extracted dari ProjectCard.tsx untuk better code organization.
 * 
 * @module app/components/projects/DemoModal
 * 
 * Usage:
 * ```tsx
 * import DemoModal from '@/app/components/projects/DemoModal';
 * 
 * {isOpen && project.demoUrl && (
 *   <DemoModal project={projectData} onClose={() => setIsOpen(false)} />
 * )}
 * ```
 */

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/types/project.types";

/**
 * DemoModal Props
 */
interface DemoModalProps {
  /** Project data (needs demoUrl) */
  project: Project;
  /** Callback function when modal is closed */
  onClose: () => void;
}

/**
 * DemoModal Component
 * 
 * Full-screen modal yang menampilkan live demo project dalam iframe.
 * 
 * Features:
 * - Iframe dengan sandbox security
 * - Responsive sizing (80vh height)
 * - Close button
 * - Click outside to close
 * - Smooth animations
 * 
 * Security:
 * Iframe menggunakan sandbox attribute untuk keamanan:
 * - allow-scripts: Allow JavaScript execution
 * - allow-same-origin: Allow same-origin requests
 * - allow-forms: Allow form submissions
 * - allow-popups: Allow popups (untuk OAuth flows, etc.)
 * 
 * @param project - Project data object (must have demoUrl)
 * @param onClose - Function to call when closing modal
 */
const DemoModal: React.FC<DemoModalProps> = ({ project, onClose }) => {
  // Guard: Return null jika tidak ada demoUrl
  if (!project.demoUrl) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
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
              <h3 id="demo-modal-title" className="text-xl font-bold text-white">
                Live Demo - {project.title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                aria-label="Close demo modal"
              >
                ✕
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 rounded-xl overflow-hidden border border-white/20">
              <iframe
                src={project.demoUrl}
                className="w-full h-full"
                title={`${project.title} Demo`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </div>

            {/* Info Text */}
            <div className="mt-4 text-center text-sm text-white/40">
              <p>
                💡 Tip: Click the close button or press ESC to exit demo view
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DemoModal;

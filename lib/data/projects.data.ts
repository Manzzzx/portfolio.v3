/**
 * Projects Data
 * 
 * Array of project objects untuk showcase di portfolio.
 * File ini berisi semua project data yang akan ditampilkan.
 * 
 * @module lib/data/projects.data
 * 
 * ⚠️ IMPORTANT: Isi array ini dengan project data kamu!
 * 
 * Usage:
 * ```tsx
 * import { projectsData } from '@/lib/data/projects.data';
 * 
 * // Display all projects
 * projectsData.map(project => <ProjectCard project={project} />)
 * ```
 * 
 * Example Project Object:
 * ```typescript
 * {
 *   id: "portfolio-v3",
 *   title: "Portfolio Website v3",
 *   description: "A modern, responsive portfolio website built with Next.js 15",
 *   longDescription: "Detailed description here...",
 *   image: "https://example.com/image.jpg",
 *   demoUrl: "https://example.com",
 *   githubUrl: "https://github.com/username/repo",
 *   technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
 *   category: "Web App",
 *   status: "Completed",
 *   featured: true,
 *   stats: {
 *     stars: 24,
 *     views: 1200,
 *     commits: 156
 *   },
 *   timeline: {
 *     started: "Dec 2024",
 *     completed: "Jan 2025",
 *     duration: "1 month"
 *   },
 *   features: [
 *     "Responsive design",
 *     "Dark mode support",
 *     "SEO optimized"
 *   ],
 *   challenges: [
 *     "Implementing complex animations",
 *     "Optimizing performance"
 *   ],
 *   learnings: [
 *     "Advanced Next.js patterns",
 *     "TypeScript best practices"
 *   ],
 *   teamSize: 1,
 *   role: "Full Stack Developer"
 * }
 * ```
 */

import type { Project } from "@/lib/types/project.types";

/**
 * Projects Data Array
 * 
 * 📝 TODO: Tambahkan project kamu di sini!
 * 
 * Tips:
 * 1. Gunakan id yang unique (kebab-case)
 * 2. Pastikan technologies match dengan TECH_ICONS keys
 * 3. Gunakan image URL yang valid (bisa dari Pexels, Unsplash, atau hosting sendiri)
 * 4. Set featured: true untuk project yang ingin ditampilkan di homepage
 * 5. Isi description singkat (1-2 kalimat) dan longDescription detail (2-3 paragraf)
 * 
 * Available Categories: "Web App" | "Mobile App" | "API" | "Tool" | "Game"
 * Available Status: "Completed" | "In Progress" | "Planning"
 * 
 * Available Technologies (lihat lib/config/tech-icons.config.ts untuk list lengkap):
 * - Frontend: "React", "Next.js", "React Native", "Vite", "Tailwind CSS"
 * - Languages: "TypeScript", "JavaScript", "Python"
 * - Backend: "Node.js", "Express"
 * - Database: "MongoDB", "PostgreSQL", "Redis"
 * - Tools: "Docker", "Prisma", "Firebase"
 */
export const projectsData: Project[] = [
  // 🚀 TAMBAHKAN PROJECT KAMU DI SINI!
  // Uncomment dan isi template di bawah ini:
  
  /*
  {
    id: "project-id-here",
    title: "Project Title",
    description: "Short description for card preview (1-2 sentences)",
    longDescription: "Detailed description for modal. Explain what the project does, why you built it, and what makes it special. Include 2-3 paragraphs.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    demoUrl: "https://your-demo-url.com", // Optional
    githubUrl: "https://github.com/yourusername/repo", // Optional
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    category: "Web App", // "Web App" | "Mobile App" | "API" | "Tool" | "Game"
    status: "Completed", // "Completed" | "In Progress" | "Planning"
    featured: true, // true untuk ditampilkan di homepage
    stats: { // Optional
      stars: 0,
      views: 0,
      commits: 0
    },
    timeline: {
      started: "Jan 2025",
      completed: "Feb 2025", // Optional untuk ongoing projects
      duration: "1 month"
    },
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ],
    challenges: [ // Optional
      "Challenge 1",
      "Challenge 2"
    ],
    learnings: [ // Optional
      "Learning 1",
      "Learning 2"
    ],
    teamSize: 1, // Optional
    role: "Full Stack Developer" // Optional
  },
  */
];

/**
 * Export default untuk backward compatibility
 */
export default projectsData;

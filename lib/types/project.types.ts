/**
 * Project Type Definitions
 * 
 * TypeScript interfaces dan types untuk project data structure.
 * File ini mendefinisikan shape dari project object.
 * 
 * @module lib/types/project.types
 * 
 * Usage:
 * ```tsx
 * import type { Project, ProjectStatus, ProjectCategory } from '@/lib/types/project.types';
 * 
 * const myProject: Project = {
 *   id: "my-project",
 *   title: "My Project",
 *   // ...
 * };
 * ```
 */

/**
 * Project Status
 * Status dari project development
 */
export type ProjectStatus = "Completed" | "In Progress" | "Planning";

/**
 * Project Category
 * Kategori/tipe dari project
 */
export type ProjectCategory = "Web App" | "Mobile App" | "API" | "Tool" | "Game";

/**
 * Project Stats
 * Statistik project (GitHub stars, views, etc.)
 */
export interface ProjectStats {
  /** GitHub stars count */
  stars?: number;
  
  /** GitHub forks count */
  forks?: number;
  
  /** Project views/visits */
  views?: number;
  
  /** Total commits */
  commits?: number;
}

/**
 * Project Timeline
 * Timeline informasi dari project
 */
export interface ProjectTimeline {
  /** Start date (format: "MMM YYYY", contoh: "Dec 2024") */
  started: string;
  
  /** Completion date (format: "MMM YYYY", optional untuk ongoing projects) */
  completed?: string;
  
  /** Duration description (contoh: "2 months", "1 week") */
  duration: string;
}

/**
 * Main Project Interface
 * 
 * Complete project data structure dengan semua informasi yang diperlukan
 * untuk menampilkan project card dan detail modal.
 */
export interface Project {
  /** Unique identifier untuk project (kebab-case recommended) */
  id: string;
  
  /** Project title/name */
  title: string;
  
  /** Short description untuk card preview (1-2 sentences) */
  description: string;
  
  /** Detailed description untuk modal (2-3 paragraphs) */
  longDescription: string;
  
  /** Project thumbnail/preview image URL */
  image: string;
  
  /** Live demo URL (optional) */
  demoUrl?: string;
  
  /** GitHub repository URL (optional) */
  githubUrl?: string;
  
  /** Array of technology names (harus match dengan TECH_ICONS keys) */
  technologies: string[];
  
  /** Project category */
  category: ProjectCategory;
  
  /** Current project status */
  status: ProjectStatus;
  
  /** Is this a featured project? (ditampilkan di homepage) */
  featured: boolean;
  
  /** Project statistics (optional) */
  stats?: ProjectStats;
  
  /** Project timeline information */
  timeline: ProjectTimeline;
  
  /** List of key features (bullet points) */
  features: string[];
  
  /** Technical challenges faced (optional, untuk learning showcase) */
  challenges?: string[];
  
  /** Key learnings from the project (optional) */
  learnings?: string[];
  
  /** Team size (1 for solo projects) */
  teamSize?: number;
  
  /** Your role in the project */
  role?: string;
}

/**
 * Project Filter Options
 * Options untuk filtering projects
 */
export interface ProjectFilterOptions {
  /** Filter by category ("All" untuk show all) */
  category?: ProjectCategory | "All";
  
  /** Filter by status ("All" untuk show all) */
  status?: ProjectStatus | "All";
  
  /** Filter featured only */
  featuredOnly?: boolean;
  
  /** Search query (search in title & description) */
  searchQuery?: string;
}

/**
 * Project Counts
 * Count of projects per category
 */
export interface ProjectCounts {
  All: number;
  "Web App": number;
  "Mobile App": number;
  API: number;
  Tool: number;
  Game: number;
}

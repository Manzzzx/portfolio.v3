/**
 * Projects Components Barrel Export
 * 
 * Central export point untuk semua project-related components.
 * Memudahkan imports dan maintainability.
 * 
 * @module app/components/projects
 * 
 * Usage:
 * ```tsx
 * // Before (multiple imports)
 * import ProjectCard from '@/app/components/projects/ProjectCard';
 * import ProjectModal from '@/app/components/projects/ProjectModal';
 * import DemoModal from '@/app/components/projects/DemoModal';
 * 
 * // After (single import)
 * import { ProjectCard, ProjectModal, DemoModal } from '@/app/components/projects';
 * ```
 */

export { default as ProjectCard } from './ProjectCard';
export { default as ProjectModal } from './ProjectModal';
export { default as DemoModal } from './DemoModal';

// Re-export types untuk convenience
export type { Project } from '@/lib/types/project.types';

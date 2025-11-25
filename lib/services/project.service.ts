/**
 * Project Service
 * 
 * Service layer untuk project data operations.
 * File ini berisi semua business logic untuk filtering, searching, dan manipulasi project data.
 * 
 * @module lib/services/project.service
 * 
 * Usage:
 * ```tsx
 * import { ProjectService } from '@/lib/services/project.service';
 * 
 * // Get all projects
 * const allProjects = ProjectService.getAll();
 * 
 * // Get featured projects
 * const featured = ProjectService.getFeatured();
 * 
 * // Filter by category
 * const webApps = ProjectService.filterByCategory("Web App");
 * 
 * // Search projects
 * const results = ProjectService.search("next.js");
 * ```
 */

import { projectsData } from "@/lib/data/projects.data";
import type { 
  Project, 
  ProjectCategory, 
  ProjectStatus, 
  ProjectFilterOptions,
  ProjectCounts 
} from "@/lib/types/project.types";

/**
 * ProjectService Class
 * 
 * Static class yang menyediakan methods untuk project data operations.
 * Semua methods adalah static, jadi tidak perlu instantiate class ini.
 */
export class ProjectService {
  /**
   * Get All Projects
   * 
   * Mendapatkan semua projects dari data source.
   * 
   * @returns Array of all projects
   * 
   * @example
   * ```tsx
   * const projects = ProjectService.getAll();
   * ```
   */
  static getAll(): Project[] {
    return projectsData;
  }

  /**
   * Get Project by ID
   * 
   * Mencari project berdasarkan ID.
   * 
   * @param id - Project ID
   * @returns Project object atau undefined jika tidak ditemukan
   * 
   * @example
   * ```tsx
   * const project = ProjectService.getById("portfolio-v3");
   * if (project) {
   *   console.log(project.title);
   * }
   * ```
   */
  static getById(id: string): Project | undefined {
    return projectsData.find(project => project.id === id);
  }

  /**
   * Get Featured Projects
   * 
   * Mendapatkan hanya projects yang di-mark sebagai featured.
   * Featured projects biasanya ditampilkan di homepage.
   * 
   * @returns Array of featured projects
   * 
   * @example
   * ```tsx
   * const featuredProjects = ProjectService.getFeatured();
   * ```
   */
  static getFeatured(): Project[] {
    return projectsData.filter(project => project.featured);
  }

  /**
   * Filter by Category
   * 
   * Filter projects berdasarkan category.
   * 
   * @param category - Project category atau "All" untuk semua
   * @returns Array of filtered projects
   * 
   * @example
   * ```tsx
   * const webApps = ProjectService.filterByCategory("Web App");
   * const allProjects = ProjectService.filterByCategory("All");
   * ```
   */
  static filterByCategory(category: ProjectCategory | "All"): Project[] {
    if (category === "All") {
      return projectsData;
    }
    return projectsData.filter(project => project.category === category);
  }

  /**
   * Filter by Status
   * 
   * Filter projects berdasarkan status.
   * 
   * @param status - Project status atau "All" untuk semua
   * @returns Array of filtered projects
   * 
   * @example
   * ```tsx
   * const completed = ProjectService.filterByStatus("Completed");
   * const inProgress = ProjectService.filterByStatus("In Progress");
   * ```
   */
  static filterByStatus(status: ProjectStatus | "All"): Project[] {
    if (status === "All") {
      return projectsData;
    }
    return projectsData.filter(project => project.status === status);
  }

  /**
   * Filter Projects
   * 
   * Advanced filtering dengan multiple criteria.
   * 
   * @param options - Filter options object
   * @returns Array of filtered projects
   * 
   * @example
   * ```tsx
   * const filtered = ProjectService.filter({
   *   category: "Web App",
   *   status: "Completed",
   *   featuredOnly: true,
   *   searchQuery: "next.js"
   * });
   * ```
   */
  static filter(options: ProjectFilterOptions): Project[] {
    let filtered = projectsData;

    // Filter by category
    if (options.category && options.category !== "All") {
      filtered = filtered.filter(project => project.category === options.category);
    }

    // Filter by status
    if (options.status && options.status !== "All") {
      filtered = filtered.filter(project => project.status === options.status);
    }

    // Filter featured only
    if (options.featuredOnly) {
      filtered = filtered.filter(project => project.featured);
    }

    // Search in title and description
    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  /**
   * Search Projects
   * 
   * Search projects by query string.
   * Searches in: title, description, and technologies.
   * 
   * @param query - Search query string
   * @returns Array of matching projects
   * 
   * @example
   * ```tsx
   * const results = ProjectService.search("react");
   * ```
   */
  static search(query: string): Project[] {
    if (!query.trim()) {
      return projectsData;
    }

    const searchQuery = query.toLowerCase();
    return projectsData.filter(project =>
      project.title.toLowerCase().includes(searchQuery) ||
      project.description.toLowerCase().includes(searchQuery) ||
      project.longDescription.toLowerCase().includes(searchQuery) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery))
    );
  }

  /**
   * Get Project Counts
   * 
   * Mendapatkan jumlah projects per category.
   * Berguna untuk menampilkan count di filter tabs.
   * 
   * @returns Object dengan count per category
   * 
   * @example
   * ```tsx
   * const counts = ProjectService.getProjectCounts();
   * // { All: 10, "Web App": 5, "Mobile App": 2, ... }
   * ```
   */
  static getProjectCounts(): ProjectCounts {
    const counts: ProjectCounts = {
      "All": projectsData.length,
      "Web App": 0,
      "Mobile App": 0,
      "API": 0,
      "Tool": 0,
      "Game": 0,
    };

    projectsData.forEach(project => {
      counts[project.category]++;
    });

    return counts;
  }

  /**
   * Get Recent Projects
   * 
   * Mendapatkan projects terbaru berdasarkan start date.
   * 
   * @param limit - Maximum number of projects to return (default: 3)
   * @returns Array of recent projects
   * 
   * @example
   * ```tsx
   * const recent = ProjectService.getRecent(5);
   * ```
   */
  static getRecent(limit: number = 3): Project[] {
    // Sort by started date (newest first)
    // Note: This is a simple sort, might need improvement for complex date formats
    const sorted = [...projectsData].sort((a, b) => {
      // Simple comparison, assumes format "MMM YYYY"
      return b.timeline.started.localeCompare(a.timeline.started);
    });

    return sorted.slice(0, limit);
  }

  /**
   * Get Projects by Technology
   * 
   * Filter projects yang menggunakan technology tertentu.
   * 
   * @param technology - Technology name
   * @returns Array of projects using the technology
   * 
   * @example
   * ```tsx
   * const nextjsProjects = ProjectService.getByTechnology("Next.js");
   * ```
   */
  static getByTechnology(technology: string): Project[] {
    return projectsData.filter(project =>
      project.technologies.includes(technology)
    );
  }

  /**
   * Get Total Count
   * 
   * Mendapatkan total jumlah projects.
   * 
   * @returns Total number of projects
   * 
   * @example
   * ```tsx
   * const total = ProjectService.getTotalCount();
   * ```
   */
  static getTotalCount(): number {
    return projectsData.length;
  }

  /**
   * Check if Empty
   * 
   * Check apakah ada projects atau tidak.
   * 
   * @returns true jika tidak ada projects
   * 
   * @example
   * ```tsx
   * if (ProjectService.isEmpty()) {
   *   return <EmptyState />;
   * }
   * ```
   */
  static isEmpty(): boolean {
    return projectsData.length === 0;
  }
}

/**
 * Export helper functions untuk backward compatibility
 */

export const getAllProjects = () => ProjectService.getAll();
export const getProjectById = (id: string) => ProjectService.getById(id);
export const getFeaturedProjects = () => ProjectService.getFeatured();
export const filterProjectsByCategory = (category: ProjectCategory | "All") => 
  ProjectService.filterByCategory(category);
export const filterProjectsByStatus = (status: ProjectStatus | "All") => 
  ProjectService.filterByStatus(status);
export const getProjectCounts = () => ProjectService.getProjectCounts();
export const searchProjects = (query: string) => ProjectService.search(query);

/**
 * Theme Configuration
 * 
 * Centralized theme configuration untuk konsistensi styling di seluruh aplikasi.
 * File ini berisi semua color palette, status colors, category colors, dan styling constants.
 * 
 * @module lib/config/theme.config
 * 
 * Usage:
 * ```tsx
 * import { THEME_CONFIG } from '@/lib/config/theme.config';
 * 
 * // Menggunakan primary color
 * <div style={{ color: THEME_CONFIG.colors.primary }}>Text</div>
 * 
 * // Menggunakan status colors
 * <span className={THEME_CONFIG.status.completed.className}>Completed</span>
 * ```
 */

/**
 * Main Color Palette
 * Warna utama yang digunakan di seluruh aplikasi
 */
export const THEME_CONFIG = {
  colors: {
    // Primary colors - Warna utama untuk brand identity
    primary: "#8DD8FF",      // Light blue - untuk accent dan highlights
    secondary: "#5ab7d8",    // Darker blue - untuk secondary elements
    
    // Background colors - Warna background dengan opacity
    background: {
      main: "#101c2c",       // Dark blue background
      overlay: "#1a2333",    // Slightly lighter untuk overlays
      card: "#101c2c/60",    // Card background dengan transparency
    },
    
    // Border colors
    border: {
      primary: "#8DD8FF",
      secondary: "#8DD8FF/50",
      light: "#8DD8FF/30",
    },
    
    // Text colors
    text: {
      primary: "#FFFFFF",
      secondary: "#b7d6f7",
      muted: "#blue-100/80",
      light: "#cyan-100",
    },
    
    // Navigation specific colors
    nav: {
      default: "#b7d6f7",
      active: "#b7e3ff",
      background: "#1a2333/60",
    },
  },
  
  /**
   * Status Colors
   * Warna untuk status badge (Completed, In Progress, Planning)
   * 
   * Format:
   * - bg: Background color class
   * - text: Text color class
   * - border: Border color class
   * - className: Combined classes untuk kemudahan
   */
  status: {
    completed: {
      bg: "bg-green-500/20",
      text: "text-green-300",
      border: "border-green-500/30",
      className: "bg-green-500/20 text-green-300 border-green-500/30",
    },
    inProgress: {
      bg: "bg-yellow-500/20",
      text: "text-yellow-300",
      border: "border-yellow-500/30",
      className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    },
    planning: {
      bg: "bg-blue-500/20",
      text: "text-blue-300",
      border: "border-blue-500/30",
      className: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
  },
  
  /**
   * Category Colors
   * Warna untuk category badge (Web App, Mobile App, API, Tool, Game)
   */
  category: {
    webApp: {
      bg: "bg-purple-500/20",
      text: "text-purple-300",
      className: "bg-purple-500/20 text-purple-300",
    },
    mobileApp: {
      bg: "bg-pink-500/20",
      text: "text-pink-300",
      className: "bg-pink-500/20 text-pink-300",
    },
    api: {
      bg: "bg-orange-500/20",
      text: "text-orange-300",
      className: "bg-orange-500/20 text-orange-300",
    },
    tool: {
      bg: "bg-cyan-500/20",
      text: "text-cyan-300",
      className: "bg-cyan-500/20 text-cyan-300",
    },
    game: {
      bg: "bg-red-500/20",
      text: "text-red-300",
      className: "bg-red-500/20 text-red-300",
    },
  },
  
  /**
   * Spacing & Sizing
   * Konsisten spacing values
   */
  spacing: {
    section: "py-8 sm:py-16 px-4",
    card: "p-6",
    container: "max-w-7xl mx-auto",
  },
  
  /**
   * Border Radius
   */
  borderRadius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
  },
  
  /**
   * Shadows
   */
  shadows: {
    card: "shadow-lg",
    hover: "hover:shadow-xl",
  },
  
  /**
   * Transitions
   */
  transitions: {
    default: "transition-all duration-300",
    fast: "transition-all duration-200",
    slow: "transition-all duration-500",
  },
} as const;

/**
 * Helper function untuk mendapatkan status className
 * 
 * @param status - Status string ("Completed" | "In Progress" | "Planning")
 * @returns Tailwind className string
 * 
 * @example
 * ```tsx
 * <div className={getStatusClassName("Completed")}>
 *   Completed
 * </div>
 * ```
 */
export function getStatusClassName(status: "Completed" | "In Progress" | "Planning"): string {
  const statusMap = {
    "Completed": THEME_CONFIG.status.completed.className,
    "In Progress": THEME_CONFIG.status.inProgress.className,
    "Planning": THEME_CONFIG.status.planning.className,
  };
  
  return statusMap[status] || THEME_CONFIG.status.planning.className;
}

/**
 * Helper function untuk mendapatkan category className
 * 
 * @param category - Category string
 * @returns Tailwind className string
 * 
 * @example
 * ```tsx
 * <div className={getCategoryClassName("Web App")}>
 *   Web App
 * </div>
 * ```
 */
export function getCategoryClassName(category: "Web App" | "Mobile App" | "API" | "Tool" | "Game"): string {
  const categoryMap = {
    "Web App": THEME_CONFIG.category.webApp.className,
    "Mobile App": THEME_CONFIG.category.mobileApp.className,
    "API": THEME_CONFIG.category.api.className,
    "Tool": THEME_CONFIG.category.tool.className,
    "Game": THEME_CONFIG.category.game.className,
  };
  
  return categoryMap[category] || THEME_CONFIG.category.webApp.className;
}

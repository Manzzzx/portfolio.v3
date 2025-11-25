/**
 * Technology Icons Configuration
 * 
 * Mapping technology names ke React Icon components dan color classes.
 * File ini digunakan untuk menampilkan tech stack icons di project cards.
 * 
 * @module lib/config/tech-icons.config
 * 
 * Usage:
 * ```tsx
 * import { getTechIcon, getTechColor } from '@/lib/config/tech-icons.config';
 * 
 * const Icon = getTechIcon("React");
 * const colorClass = getTechColor("React");
 * 
 * <Icon className={colorClass} />
 * ```
 */

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
  SiDocker,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiFirebase,
  SiVite,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";

/**
 * Technology Icon Mapping
 * 
 * Map technology name (string) ke React Icon component.
 * Tambahkan technology baru di sini sesuai kebutuhan.
 * 
 * @example
 * ```tsx
 * const ReactIcon = TECH_ICONS["React"];
 * <ReactIcon className="w-6 h-6" />
 * ```
 */
export const TECH_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  // Frontend Frameworks & Libraries
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "Vite": SiVite,
  
  // Styling
  "Tailwind CSS": SiTailwindcss,
  "CSS3": SiCss3,
  
  // Languages
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Python": SiPython,
  "HTML5": SiHtml5,
  
  // Backend
  "Node.js": SiNodedotjs,
  "Express": SiExpress,
  
  // Databases
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "Redis": SiRedis,
  
  // ORMs & Tools
  "Prisma": SiPrisma,
  "Firebase": SiFirebase,
  "Docker": SiDocker,
  
  // Version Control & Deployment
  "Git": SiGit,
  "GitHub": SiGithub,
  "Vercel": SiVercel,
};

/**
 * Technology Color Mapping
 * 
 * Map technology name ke Tailwind color class.
 * Warna ini sesuai dengan brand color dari masing-masing technology.
 * 
 * @example
 * ```tsx
 * const reactColor = TECH_COLORS["React"];
 * <SiReact className={reactColor} />
 * ```
 */
export const TECH_COLORS: Record<string, string> = {
  // Frontend Frameworks & Libraries
  "React": "text-[#61DAFB]",           // React blue
  "Next.js": "text-white",             // Next.js white
  "React Native": "text-[#61DAFB]",   // Same as React
  "Vite": "text-[#646CFF]",           // Vite purple
  
  // Styling
  "Tailwind CSS": "text-[#06B6D4]",   // Tailwind cyan
  "CSS3": "text-[#1572B6]",           // CSS blue
  
  // Languages
  "TypeScript": "text-[#3178C6]",     // TypeScript blue
  "JavaScript": "text-[#F7DF1E]",     // JavaScript yellow
  "Python": "text-[#3776AB]",         // Python blue
  "HTML5": "text-[#E34F26]",          // HTML orange
  
  // Backend
  "Node.js": "text-[#339933]",        // Node.js green
  "Express": "text-white",            // Express white
  
  // Databases
  "MongoDB": "text-[#47A248]",        // MongoDB green
  "PostgreSQL": "text-[#4169E1]",     // PostgreSQL blue
  "Redis": "text-[#DC382D]",          // Redis red
  
  // ORMs & Tools
  "Prisma": "text-[#2D3748]",         // Prisma dark
  "Firebase": "text-[#FFCA28]",       // Firebase yellow
  "Docker": "text-[#2496ED]",         // Docker blue
  
  // Version Control & Deployment
  "Git": "text-[#F05032]",            // Git orange
  "GitHub": "text-white",             // GitHub white
  "Vercel": "text-white",             // Vercel white
};

/**
 * Helper function untuk mendapatkan icon component
 * 
 * @param techName - Nama technology
 * @returns React Icon component atau undefined jika tidak ditemukan
 * 
 * @example
 * ```tsx
 * const Icon = getTechIcon("React");
 * if (Icon) {
 *   return <Icon className="w-6 h-6" />;
 * }
 * ```
 */
export function getTechIcon(techName: string): React.ComponentType<{ className?: string }> | undefined {
  return TECH_ICONS[techName];
}

/**
 * Helper function untuk mendapatkan color class
 * 
 * @param techName - Nama technology
 * @returns Tailwind color class string atau default white
 * 
 * @example
 * ```tsx
 * const colorClass = getTechColor("React");
 * <SiReact className={colorClass} />
 * ```
 */
export function getTechColor(techName: string): string {
  return TECH_COLORS[techName] || "text-white";
}

/**
 * Helper function untuk mendapatkan icon dan color sekaligus
 * 
 * @param techName - Nama technology
 * @returns Object dengan icon component dan color class
 * 
 * @example
 * ```tsx
 * const { Icon, colorClass } = getTechIconWithColor("React");
 * if (Icon) {
 *   return <Icon className={colorClass} />;
 * }
 * ```
 */
export function getTechIconWithColor(techName: string) {
  return {
    Icon: getTechIcon(techName),
    colorClass: getTechColor(techName),
  };
}

/**
 * Helper function untuk mendapatkan semua available technologies
 * 
 * @returns Array of technology names
 * 
 * @example
 * ```tsx
 * const allTechs = getAvailableTechnologies();
 * // ["React", "Next.js", "TypeScript", ...]
 * ```
 */
export function getAvailableTechnologies(): string[] {
  return Object.keys(TECH_ICONS);
}

/**
 * Type exports untuk TypeScript
 */
export type TechnologyName = keyof typeof TECH_ICONS;

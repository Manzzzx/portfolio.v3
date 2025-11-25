/**
 * Application Configuration
 * 
 * Centralized app-level configuration untuk metadata, navigation, dan social links.
 * File ini berisi semua konstanta yang digunakan di seluruh aplikasi.
 * 
 * @module lib/config/app.config
 * 
 * Usage:
 * ```tsx
 * import { APP_CONFIG } from '@/lib/config/app.config';
 * 
 * // Menggunakan site metadata
 * export const metadata = {
 *   title: APP_CONFIG.site.title,
 *   description: APP_CONFIG.site.description,
 * };
 * 
 * // Menggunakan navigation items
 * {APP_CONFIG.navigation.map(item => (
 *   <Link href={item.href}>{item.name}</Link>
 * ))}
 * ```
 */

import { FaCode, FaHome, FaChartBar } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";

/**
 * Site Metadata
 * Informasi dasar tentang website
 */
export const APP_CONFIG = {
  site: {
    // Site title - ditampilkan di browser tab
    title: "マンヅ",
    
    // Site description - untuk SEO
    description: "Vibe Coder",
    
    // Site URL - base URL untuk production
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    
    // Site name - untuk display
    name: "マンヅ",
    
    // Logo path
    logo: "/images/logo.jpg",
  },
  
  /**
   * Social Links
   * Link ke social media profiles
   * 
   * Format:
   * - name: Display name
   * - url: Full URL ke profile
   * - icon: Icon identifier (untuk mapping ke icon component)
   * - username: Username tanpa @
   */
  social: {
    github: {
      name: "GitHub",
      url: "https://github.com/Manzzzx",
      icon: "github",
      username: "Manzzzx",
    },
    instagram: {
      name: "Instagram",
      url: "https://instagram.com/m4nzzt",
      icon: "instagram",
      username: "m4nzzt",
    },
    discord: {
      name: "Discord",
      url: "https://discord.com/",
      icon: "discord",
      username: "manzz", // Update dengan username Discord yang sebenarnya
    },
  },
  
  /**
   * Navigation Items
   * Menu items untuk navbar
   * 
   * Format:
   * - name: Display name di menu
   * - href: Route path
   * - icon: React Icon component
   * - ariaLabel: Accessibility label
   */
  navigation: [
    {
      name: "Home",
      href: "/",
      icon: FaHome,
      ariaLabel: "Navigate to Home",
    },
    {
      name: "Projects",
      href: "/projects",
      icon: FaCode,
      ariaLabel: "Navigate to Projects",
    },
    {
      name: "Stats",
      href: "/stats",
      icon: FaChartBar,
      ariaLabel: "Navigate to Stats",
    },
    {
      name: "Social",
      href: "/social",
      icon: TiMessages,
      ariaLabel: "Navigate to Social",
    },
  ] as const,
  
  /**
   * SEO Configuration
   * Settings untuk Search Engine Optimization
   */
  seo: {
    // Default meta tags
    defaultTitle: "マンヅ - Vibe Coder",
    titleTemplate: "%s | マンヅ",
    
    // Open Graph (untuk social media sharing)
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "マンヅ Portfolio",
    },
    
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      // site: "@yourtwitterhandle", // Uncomment dan isi jika ada Twitter
    },
  },
  
  /**
   * Feature Flags
   * Toggle features on/off
   */
  features: {
    // Enable/disable analytics
    analytics: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID !== undefined,
    
    // Enable/disable projects showcase (set to false karena masih coming soon)
    showProjects: false,
    
    // Enable/disable WakaTime stats
    wakatimeStats: false,
  },
  
  /**
   * Breakpoints
   * Responsive design breakpoints (sesuai dengan Tailwind default)
   */
  breakpoints: {
    mobile: 640,   // sm
    tablet: 768,   // md
    desktop: 1024, // lg
    wide: 1280,    // xl
  },
} as const;

/**
 * Helper function untuk mendapatkan social links sebagai array
 * 
 * @returns Array of social link objects
 * 
 * @example
 * ```tsx
 * const links = getSocialLinks();
 * links.map(link => (
 *   <a href={link.url}>{link.name}</a>
 * ))
 * ```
 */
export function getSocialLinks() {
  return Object.values(APP_CONFIG.social);
}

/**
 * Helper function untuk mendapatkan navigation items
 * 
 * @returns Array of navigation items
 * 
 * @example
 * ```tsx
 * const navItems = getNavigationItems();
 * navItems.map(item => (
 *   <Link href={item.href}>{item.name}</Link>
 * ))
 * ```
 */
export function getNavigationItems() {
  return APP_CONFIG.navigation;
}

/**
 * Type exports untuk TypeScript
 */
export type NavigationItem = typeof APP_CONFIG.navigation[number];
export type SocialLink = typeof APP_CONFIG.social[keyof typeof APP_CONFIG.social];

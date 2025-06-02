"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaCode, FaHome, FaChartBar } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";

// Constants
const THEME = {
  colors: {
    nav: "#b7d6f7",
    border: "#8DD8FF",
    activeLine: "#b7e3ff",
    background: "#1a2333/60",
  },
  breakpoints: {
    mobile: 640,
  },
} as const;

const MENU_ITEMS = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Projects", href: "/projects", icon: FaCode },
  { name: "Stats", href: "/stats", icon: FaChartBar },
  { name: "Social", href: "/#social", icon: TiMessages },
] as const;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("Home");
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const isScrolled = scrollY > 10;

    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }

    // Show navbar logic for home page
    if (pathname === "/") {
      const skillSection = document.getElementById("skills");

      if (skillSection) {
        const rect = skillSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const shouldShow = rect.top < viewportHeight * 0.8;
        setShow(shouldShow);
      } else {
        // Fallback: show after 25% scroll
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPercentage = scrollY / (documentHeight - windowHeight);
        setShow(scrollPercentage > 0.25);
      }
    } else {
      setShow(true);
    }
  }, [pathname, scrolled]);

  // Scroll event listener with cleanup
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 16); // ~60fps
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Sync active menu with URL
  useEffect(() => {
    const activeMenuItem = MENU_ITEMS.find((item) => {
      if (item.href === "/") return pathname === "/";
      return pathname && pathname.startsWith(item.href.replace("/#", "/"));
    });

    if (activeMenuItem) {
      setActiveItem(activeMenuItem.name);
    }
  }, [pathname]);

  const handleMenuClick = useCallback((itemName: string) => {
    setActiveItem(itemName);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, itemName: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActiveItem(itemName);
      }
    },
    []
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-[calc(100vw-2rem)]"
          role="navigation"
          aria-label="Main navigation"
        >
          <div
            className={cn(
              "px-3 py-2 flex items-center justify-center space-x-2 sm:space-x-4",
              "rounded-2xl border shadow-lg backdrop-blur-md",
              "bg-[#1a2333]/60"
            )}
            style={{
              borderColor: THEME.colors.border,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar">
              {MENU_ITEMS.map((item) => {
                const isActive = activeItem === item.name;
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    tabIndex={0}
                    role="menuitem"
                    aria-label={`Navigate to ${item.name}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => handleMenuClick(item.name)}
                    onKeyDown={(e) => handleKeyDown(e, item.name)}
                    className={cn(
                      "relative flex flex-col items-center justify-center group",
                      "transition-all duration-200 rounded-lg p-2",
                      isActive
                        ? "hover:bg-transparent hover:opacity-100"
                        : "hover:opacity-80 hover:bg-white/5"
                    )}
                    style={{
                      color: isActive ? THEME.colors.activeLine : THEME.colors.nav,
                      minWidth: "40px",
                      minHeight: "40px",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} className="sm:text-xl" />

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="activeItemLine"
                          className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-6 h-1 rounded-full"
                          style={{ backgroundColor: THEME.colors.activeLine }}
                          initial={{ opacity: 0, scaleX: 0.5 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0.5 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
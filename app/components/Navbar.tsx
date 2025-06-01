"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaCode, FaHome, FaChartBar } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";

const NAV_COLOR = "#b7d6f7"; // Soft icy blue
const NAV_BORDER = "#8DD8FF"; // Light blue border
const NAV_ACTIVE_LINE = "#b7e3ff"; // Icy blue underline

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const pathname = usePathname();
  const [show, setShow] = useState(false); // Set default ke false

  const menuItems = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Projects", href: "/projects", icon: FaCode },
    { name: "Stats", href: "/#stats", icon: FaChartBar },
    { name: "Social", href: "/#social", icon: TiMessages },
  ];

  // Effect untuk menangani scroll di halaman utama
  useEffect(() => {
    if (pathname !== "/") {
      setShow(true);
      return;
    }
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Logika untuk halaman utama
      const skillSection = document.getElementById('skills') || document.querySelector('section:nth-child(3)');
      
      if (skillSection) {
        // Dapatkan posisi skill section dari atas halaman
        const skillSectionTop = skillSection.getBoundingClientRect().top;
        
        // Navbar muncul saat skill section mendekati viewport
        // Gunakan persentase viewport height untuk konsistensi di berbagai perangkat
        const viewportHeight = window.innerHeight;
        setShow(skillSectionTop < viewportHeight * 0.8);
      } else {
        // Fallback jika skill section tidak ditemukan
        // Gunakan persentase scroll yang lebih kecil untuk mobile
        const documentHeight = document.body.scrollHeight;
        const scrollPercentage = (window.scrollY / (documentHeight - window.innerHeight)) * 100;
        setShow(scrollPercentage > 40); // Muncul setelah scroll 40% halaman
      }
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, scrolled]);

  // Sync active menu with URL
  useEffect(() => {
    const found = menuItems.find(item => {
      // Support both / and /#anchor
      if (item.href === "/") return pathname === "/";
      return pathname.startsWith(item.href.replace("#", ""));
    });
    if (found) setActiveItem(found.name);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 mb-8 w-auto"
          )}
          style={{}}
        >
          <div
            className={
              `px-3 py-1 flex items-center justify-center space-x-4 rounded-2xl border shadow-lg max-w-full bg-[#1a2333]/60 backdrop-blur-md`
            }
            style={{
              minWidth: 0,
              borderColor: NAV_BORDER,
              background: undefined,
              boxShadow: "0 2px 16px 0 #00000020"
            }}
          >
            <div className="flex items-center space-x-4 sm:space-x-2 overflow-x-auto no-scrollbar min-w-0 max-w-[calc(100vw-4rem)]">
              {menuItems.map((item) => {
                const isActive = activeItem === item.name;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    tabIndex={0}
                    aria-label={item.name}
                    onClick={() => setActiveItem(item.name)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') setActiveItem(item.name);
                    }}
                    className={cn(
                      "relative flex flex-col items-center justify-center group",
                      isActive ? "" : "hover:opacity-80"
                    )}
                    style={{ color: isActive ? NAV_ACTIVE_LINE : NAV_COLOR }}
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center transition-all duration-200",
                        ""
                      )}
                      style={{ width: 44, height: 44 }}
                    >
                      <item.icon size={20} />
                    </span>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="activeItemLine"
                          className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-10 h-1.5 rounded bg-[#b7e3ff] shadow"
                          initial={{ opacity: 0, scaleX: 0.7 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0.7 }}
                          transition={{ duration: 0.18 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
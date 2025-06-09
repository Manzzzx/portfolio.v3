"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaMobile, FaServer, FaTools, FaGamepad, FaFilter } from "react-icons/fa";

export type FilterCategory = "All" | "Web App" | "Mobile App" | "API" | "Tool" | "Game";
export type FilterStatus = "All" | "Completed" | "In Progress" | "Planning";

interface ProjectFiltersProps {
  selectedCategory: FilterCategory;
  selectedStatus: FilterStatus;
  onCategoryChange: (category: FilterCategory) => void;
  onStatusChange: (status: FilterStatus) => void;
  projectCounts: Record<FilterCategory, number>;
}

const categoryIcons: Record<FilterCategory, React.ComponentType<{ className?: string }>> = {
  "All": FaFilter,
  "Web App": FaCode,
  "Mobile App": FaMobile,
  "API": FaServer,
  "Tool": FaTools,
  "Game": FaGamepad,
};

const categoryColors: Record<FilterCategory, string> = {
  "All": "from-blue-400 to-cyan-400",
  "Web App": "from-purple-400 to-pink-400",
  "Mobile App": "from-pink-400 to-rose-400",
  "API": "from-orange-400 to-red-400",
  "Tool": "from-cyan-400 to-blue-400",
  "Game": "from-red-400 to-orange-400",
};

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
  projectCounts,
}) => {
  const categories: FilterCategory[] = ["All", "Web App", "Mobile App", "API", "Tool", "Game"];
  const statuses: FilterStatus[] = ["All", "Completed", "In Progress", "Planning"];

  return (
    <div className="w-full max-w-6xl mx-auto mb-12">
      {/* Category Filters */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FaFilter className="w-4 h-4 text-[#8DD8FF]" />
          Filter by Category
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const isSelected = selectedCategory === category;
            const count = projectCounts[category] || 0;
            const gradient = categoryColors[category];

            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
                  ${isSelected 
                    ? 'bg-gradient-to-r text-white shadow-lg' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                  }
                `}
                style={isSelected ? { backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` } : {}}
              >
                {isSelected && (
                  <motion.div
                    layoutId="categoryBackground"
                    className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl`}
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{category}</span>
                  {count > 0 && (
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-bold
                      ${isSelected ? 'bg-white/20' : 'bg-[#8DD8FF]/20 text-[#8DD8FF]'}
                    `}>
                      {count}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Status Filters */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-blue-400"></div>
          Filter by Status
        </h3>
        <div className="flex flex-wrap gap-3">
          {statuses.map((status) => {
            const isSelected = selectedStatus === status;
            
            const statusColors = {
              "All": "from-blue-400 to-cyan-400",
              "Completed": "from-green-400 to-emerald-400",
              "In Progress": "from-yellow-400 to-orange-400",
              "Planning": "from-blue-400 to-indigo-400"
            };

            const statusIcons = {
              "All": "🔍",
              "Completed": "✅",
              "In Progress": "🚧",
              "Planning": "📋"
            };

            return (
              <motion.button
                key={status}
                onClick={() => onStatusChange(status)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
                  ${isSelected 
                    ? 'bg-gradient-to-r text-white shadow-lg' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                  }
                `}
              >
                {isSelected && (
                  <motion.div
                    layoutId="statusBackground"
                    className={`absolute inset-0 bg-gradient-to-r ${statusColors[status]} rounded-xl`}
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative flex items-center gap-2">
                  <span>{statusIcons[status]}</span>
                  <span>{status}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
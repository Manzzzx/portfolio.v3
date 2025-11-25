"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, Code, Monitor, Layers, Award, Snowflake, 
  TrendingUp, Calendar, Zap, Coffee, Moon, Sun,
  Trophy, Target, Activity
} from "lucide-react";

// Types
type WakaTimeData = {
  name: string;
  total_seconds: number;
  percent: number;
};

type WakaTimeDayData = {
  languages: WakaTimeData[];
  editors: WakaTimeData[];
  operating_systems: WakaTimeData[];
  categories: WakaTimeData[];
  grand_total: { text: string; total_seconds: number };
  range: { date: string };
};

type WakaTimeSummary = {
  data: WakaTimeDayData[];
};

type AggregatedData = {
  languages: Record<string, number>;
  editors: Record<string, number>;
  operating_systems: Record<string, number>;
  categories: Record<string, number>;
  total_seconds: number;
  daily_data: { date: string; seconds: number }[];
};

// Color palette
const COLOR_PALETTE = [
  "from-blue-400 to-blue-600",
  "from-cyan-400 to-cyan-600", 
  "from-teal-400 to-teal-600",
  "from-purple-400 to-purple-600",
  "from-slate-400 to-slate-600",
  "from-sky-400 to-sky-600",
  "from-blue-500 to-cyan-500",
  "from-indigo-500 to-blue-500",
  "from-cyan-500 to-teal-500",
  "from-[#8dd8ff] to-[#5ab7d8]",
];

// Utility functions
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};

const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return "0.0%";
  return ((value / total) * 100).toFixed(1) + "%";
};

/**
 * Animated Counter Component
 * Counts up from 0 to target value with smooth animation
 */
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <>{formatDuration(count)}</>;
};

/**
 * Achievement Badge Component
 */
const AchievementBadge = ({ 
  icon, 
  label, 
  unlocked, 
  description 
}: { 
  icon: string; 
  label: string; 
  unlocked: boolean; 
  description: string; 
}) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className={`group relative ${unlocked ? '' : 'opacity-40'}`}
  >
    <div className={`
      p-4 rounded-2xl border-2 transition-all duration-300
      ${unlocked 
        ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/50 hover:border-yellow-400 hover:scale-105' 
        : 'bg-white/5 border-white/20'
      }
    `}>
      <div className="text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <p className="text-xs font-bold text-white">{label}</p>
      </div>
    </div>
    
    {/* Tooltip */}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
      <div className="bg-black/90 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
        {description}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
      </div>
    </div>
  </motion.div>
);

/**
 * Mini Sparkline Chart
 */
const Sparkline = ({ data }: { data: number[] }) => {
  const max = Math.max(...data, 1);
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (value / max) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 30" className="w-full h-8" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8DD8FF" />
          <stop offset="100%" stopColor="#5ab7d8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/**
 * Progress Bar with Tooltip
 */
const ProgressBar = ({ 
  percent, 
  gradient,
  name,
  duration,
  percentage
}: { 
  percent: number; 
  gradient: string;
  name: string;
  duration: string;
  percentage: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percent, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${gradient} relative group`}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        </motion.div>
      </div>
      
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute left-0 top-full mt-2 bg-black/90 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap z-10"
          >
            <p className="font-bold">{name}</p>
            <p className="text-xs text-white/80">{duration} ({percentage})</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Enhanced Stat Card
 */
const StatCard = ({ 
  title, 
  icon: Icon, 
  data, 
  total,
  index = 0
}: { 
  title: string; 
  icon: React.ComponentType<{ className?: string }>; 
  data: Record<string, number>; 
  total: number;
  index?: number;
}) => {
  const entries = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-[#101c2c]/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <Icon className="w-6 h-6 text-cyan-300" />
          </div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <div className="text-center py-12">
          <Snowflake className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <p className="text-white/60 text-lg">No data available</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group bg-[#101c2c]/40 backdrop-blur-md rounded-2xl p-8 border-2 border-[#8dd8ff]/60 hover:border-[#8dd8ff] transition-all duration-300"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm group-hover:bg-white/15 transition-colors">
              <Icon className="w-6 h-6 text-cyan-300" />
            </div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <div className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">
            {entries.length} items
          </div>
        </div>
        
        <div className="space-y-5">
          {entries.map(([name, seconds], idx) => {
            const percent = (seconds / total) * 100;
            const gradient = COLOR_PALETTE[idx % COLOR_PALETTE.length];
            const duration = formatDuration(seconds);
            const percentage = formatPercentage(seconds, total);
            
            return (
              <motion.div 
                key={name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white hover:text-cyan-200 transition-colors text-base">
                    {name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-white/80 font-medium text-sm">
                      {duration}
                    </span>
                    <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      {percentage}
                    </span>
                  </div>
                </div>
                <ProgressBar 
                  percent={percent} 
                  gradient={gradient}
                  name={name}
                  duration={duration}
                  percentage={percentage}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Stats Overview with Animated Counter
 */
const StatsOverview = ({ 
  totalSeconds,
  dailyAverage,
  trend
}: { 
  totalSeconds: number;
  dailyAverage: number;
  trend: number[];
}) => (
  <div className="text-center mb-16">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex flex-col items-center gap-6 bg-[#101c2c]/40 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#8dd8ff]/60 hover:border-[#8dd8ff] transition-all duration-300 group"
    >
      <div className="flex items-center gap-6">
        <div className="p-4 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-cyan-400/20 group-hover:scale-105 transition-transform duration-300">
          <Clock className="w-12 h-12 text-cyan-300" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-white/70 text-sm font-semibold uppercase tracking-wider">
              Total Coding Time
            </p>
            {/* <Snowflake className="w-4 h-4 text-cyan-400 animate-spin" style={{animationDuration: '3s'}} /> */}
          </div>
          <p className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent mb-1">
            <AnimatedCounter value={totalSeconds} />
          </p>
          <p className="text-white/60 text-sm font-medium">
            Last 7 days of development
          </p>
        </div>
      </div>
      
      {/* Mini stats */}
      <div className="flex gap-8 pt-4 border-t border-white/10 w-full">
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-white mb-1">
            {formatDuration(dailyAverage)}
          </p>
          <p className="text-xs text-white/60">Daily Average</p>
        </div>
        <div className="flex-1">
          <Sparkline data={trend} />
          <p className="text-xs text-white/60 text-center mt-1">7-Day Trend</p>
        </div>
      </div>
    </motion.div>
  </div>
);

/**
 * Productivity Insights Card
 */
const ProductivityInsights = ({ data }: { data: AggregatedData }) => {
  const insights = useMemo(() => {
    const avgDaily = data.total_seconds / 7;
    const topLanguage = Object.entries(data.languages).sort(([,a], [,b]) => b - a)[0];
    const topEditor = Object.entries(data.editors).sort(([,a], [,b]) => b - a)[0];
    
    return {
      avgDaily,
      topLanguage: topLanguage?.[0] || "N/A",
      topEditor: topEditor?.[0] || "N/A",
      productivity: avgDaily > 14400 ? "High" : avgDaily > 7200 ? "Medium" : "Low",
    };
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl p-8 border-2 border-purple-400/30 hover:border-purple-400/60 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <TrendingUp className="w-6 h-6 text-purple-300" />
        </div>
        <h2 className="text-xl font-bold text-white">Productivity Insights</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <p className="text-xs text-white/60">Productivity Level</p>
          </div>
          <p className="text-2xl font-bold text-white">{insights.productivity}</p>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-cyan-400" />
            <p className="text-xs text-white/60">Top Language</p>
          </div>
          <p className="text-2xl font-bold text-white truncate">{insights.topLanguage}</p>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="w-4 h-4 text-cyan-400" />
            <p className="text-xs text-white/60">Favorite Editor</p>
          </div>
          <p className="text-2xl font-bold text-white truncate">{insights.topEditor}</p>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <p className="text-xs text-white/60">Daily Average</p>
          </div>
          <p className="text-2xl font-bold text-white">{formatDuration(insights.avgDaily)}</p>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Achievements Section
 */
const AchievementsSection = ({ data }: { data: AggregatedData }) => {
  const avgDaily = data.total_seconds / 7;
  const totalHours = data.total_seconds / 3600;
  
  const achievements = [
    { 
      icon: "🔥", 
      label: "7 Day Streak", 
      unlocked: data.total_seconds > 0,
      description: "Coded for 7 days straight!"
    },
    { 
      icon: "⚡", 
      label: "Speed Coder", 
      unlocked: avgDaily > 14400, // 4+ hours/day
      description: "Average 4+ hours per day"
    },
    { 
      icon: "🌙", 
      label: "Night Owl", 
      unlocked: totalHours > 20,
      description: "20+ hours of coding"
    },
    { 
      icon: "☕", 
      label: "Dedicated", 
      unlocked: totalHours > 30,
      description: "30+ hours this week!"
    },
    { 
      icon: "🚀", 
      label: "Productive", 
      unlocked: avgDaily > 10800, // 3+ hours/day
      description: "Consistently productive"
    },
    { 
      icon: "💎", 
      label: "Master", 
      unlocked: totalHours > 40,
      description: "40+ hours - You're a pro!"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">Achievements</h2>
          <Trophy className="w-8 h-8 text-yellow-400" />
        </div>
        <p className="text-white/60">Unlock badges by coding consistently!</p>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {achievements.map((achievement, i) => (
          <AchievementBadge key={i} {...achievement} />
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Fun Facts Section
 */
const FunFacts = ({ totalSeconds }: { totalSeconds: number }) => {
  const hours = totalSeconds / 3600;
  const facts = [
    `You've coded enough to watch ${Math.floor(hours / 2)} movies! 🎬`,
    `That's ${Math.floor(hours / 8)} full workdays of coding! 💼`,
    `You could have flown ${Math.floor(hours / 12)} times across the country! ✈️`,
    `Equivalent to ${Math.floor(hours * 60 / 3)} cups of coffee! ☕`,
  ];

  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-center mt-12 mb-8"
    >
      <div className="inline-block bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl px-8 py-4 border border-cyan-400/30">
        <p className="text-cyan-300 font-semibold mb-2">💡 Fun Fact</p>
        <p className="text-white/80 text-lg">{randomFact}</p>
      </div>
    </motion.div>
  );
};

/**
 * Loading Spinner
 */
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-6" />
        <Snowflake className="w-6 h-6 text-cyan-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <p className="text-white/80 text-lg font-medium">Loading WakaTime Analytics...</p>
      <div className="flex justify-center gap-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" 
            style={{animationDelay: `${i * 0.1}s`}}
          />
        ))}
      </div>
    </div>
  </div>
);

/**
 * Error Message
 */
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center max-w-md mx-auto p-8">
      <div className="w-20 h-20 bg-red-500/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-red-400/20">
        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
      <p className="text-white/70 mb-6 leading-relaxed">{message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-xl transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40 backdrop-blur-sm font-medium"
      >
        Try Again
      </button>
    </div>
  </div>
);

/**
 * Custom Hooks
 */
const useWakaTimeData = () => {
  const [summary, setSummary] = useState<WakaTimeSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/wakatime");
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { summary, loading, error };
};

const useAggregatedData = (summary: WakaTimeSummary | null): AggregatedData => {
  return useMemo(() => {
    if (!summary?.data?.length) {
      return {
        languages: {},
        editors: {},
        operating_systems: {},
        categories: {},
        total_seconds: 0,
        daily_data: [],
      };
    }

    const dailyData = summary.data.map(day => ({
      date: day.range.date,
      seconds: day.grand_total?.total_seconds || 0
    }));

    return summary.data.reduce<AggregatedData>(
      (acc, day) => {
        day.languages?.forEach(lang => {
          acc.languages[lang.name] = (acc.languages[lang.name] || 0) + lang.total_seconds;
        });
        
        day.editors?.forEach(editor => {
          acc.editors[editor.name] = (acc.editors[editor.name] || 0) + editor.total_seconds;
        });
        
        day.operating_systems?.forEach(os => {
          acc.operating_systems[os.name] = (acc.operating_systems[os.name] || 0) + os.total_seconds;
        });
        
        day.categories?.forEach(category => {
          acc.categories[category.name] = (acc.categories[category.name] || 0) + category.total_seconds;
        });
        
        acc.total_seconds += day.grand_total?.total_seconds || 0;
        
        return acc;
      },
      {
        languages: {},
        editors: {},
        operating_systems: {},
        categories: {},
        total_seconds: 0,
        daily_data: dailyData,
      }
    );
  }, [summary]);
};

/**
 * Main Component
 */
export default function WakaTimeAnalytics() {
  const { summary, loading, error } = useWakaTimeData();
  const aggregatedData = useAggregatedData(summary);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!summary) return <ErrorMessage message="No data available" />;

  const dailyAverage = aggregatedData.total_seconds / 7;
  const trend = aggregatedData.daily_data.map(d => d.seconds);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <Award className="w-10 h-10 text-cyan-300" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              WakaTime Analytics
            </h1>
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <Snowflake className="w-10 h-10 text-blue-400 animate-spin" style={{animationDuration: '4s'}} />
            </div>
          </div>
          <p className="text-white/70 text-lg">Track your coding journey and productivity</p>
        </motion.div>

        {/* Stats Overview */}
        <StatsOverview 
          totalSeconds={aggregatedData.total_seconds}
          dailyAverage={dailyAverage}
          trend={trend}
        />

        {/* Achievements */}
        <AchievementsSection data={aggregatedData} />

        {/* Productivity Insights */}
        <div className="mb-8">
          <ProductivityInsights data={aggregatedData} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
          <StatCard
            title="Programming Languages"
            icon={Code}
            data={aggregatedData.languages}
            total={aggregatedData.total_seconds}
            index={0}
          />
          <StatCard
            title="Code Editors"
            icon={Monitor}
            data={aggregatedData.editors}
            total={aggregatedData.total_seconds}
            index={1}
          />
          <StatCard
            title="Operating Systems"
            icon={Layers}
            data={aggregatedData.operating_systems}
            total={aggregatedData.total_seconds}
            index={2}
          />
          <StatCard
            title="Categories"
            icon={Layers}
            data={aggregatedData.categories}
            total={aggregatedData.total_seconds}
            index={3}
          />
        </div>

        {/* Fun Facts */}
        <FunFacts totalSeconds={aggregatedData.total_seconds} />

        {/* Footer */}
        <div className="text-center pt-12 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Snowflake className="w-5 h-5 text-cyan-400" />
            <p className="text-white/60 text-lg font-medium">
              Powered by{" "}
              <a 
                href="https://wakatime.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 transition-colors font-semibold"
              >
                WakaTime
              </a>
            </p>
            <Snowflake className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-white/50 text-sm">
            Stay productive and track your development journey
          </p>
        </div>
      </div>
    </div>
  );
}
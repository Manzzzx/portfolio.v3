"use client";
import React, { useEffect, useState } from "react";
import { Clock, Code, Monitor, Layers, Award, Snowflake } from "lucide-react";

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
};

// Winter color palette
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

// Utility Functions
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

// Components
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-6"></div>
        <Snowflake className="w-6 h-6 text-cyan-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <p className="text-white/80 text-lg font-medium">Loading WakaTime Analytics...</p>
      <div className="flex justify-center gap-1 mt-4">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  </div>
);

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

const ProgressBar = ({ percent, gradient }: { percent: number; gradient: string }) => (
  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
    <div
      className={`h-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out rounded-full relative`}
      style={{ width: `${Math.min(percent, 100)}%` }}
    >
      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
    </div>
  </div>
);

const StatCard = ({ 
  title, 
  icon: Icon, 
  data, 
  total 
}: { 
  title: string; 
  icon: React.ComponentType<{ className?: string }>; 
  data: Record<string, number>; 
  total: number; 
}) => {
  const entries = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  if (entries.length === 0) {
    return (
      <div className="bg-[#101c2c]/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
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
      </div>
    );
  }

  return (
    <div className="bg-[#101c2c]/40 backdrop-blur-md rounded-2xl p-8 border-2 border-[#8dd8ff]/60 hover:border-[#8dd8ff] transition-all duration-300 group">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm group-hover:bg-white/15 transition-colors">
          <Icon className="w-6 h-6 text-cyan-300" />
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      
      <div className="space-y-6">
        {entries.map(([name, seconds], index) => {
          const percent = (seconds / total) * 100;
          const gradient = COLOR_PALETTE[index % COLOR_PALETTE.length];
          
          return (
            <div key={name} className="group/item">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white group-hover/item:text-cyan-200 transition-colors text-lg">
                  {name}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-white/80 font-medium">
                    {formatDuration(seconds)}
                  </span>
                  <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    {formatPercentage(seconds, total)}
                  </span>
                </div>
              </div>
              <ProgressBar percent={percent} gradient={gradient} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatsOverview = ({ totalSeconds }: { totalSeconds: number }) => (
  <div className="text-center mb-16">
    <div className="inline-flex items-center gap-6 bg-[#101c2c]/40 backdrop-blur-xl rounded-3xl p-10 border border-[#8dd8ff]/60 hover:border-[#8dd8ff] transition-all duration-300 group">
      <div className="p-4 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-cyan-400/20 group-hover:scale-105 transition-transform duration-300">
        <Clock className="w-12 h-12 text-cyan-300" />
      </div>
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-wider">
            Total Coding Time
          </p>
          <Snowflake className="w-4 h-4 text-cyan-400 animate-spin" style={{animationDuration: '3s'}} />
        </div>
        <p className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent mb-1">
          {formatDuration(totalSeconds)}
        </p>
        <p className="text-white/60 text-sm font-medium">
          Last 7 days of development
        </p>
      </div>
    </div>
  </div>
);

// Custom hooks
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
  return React.useMemo(() => {
    if (!summary?.data?.length) {
      return {
        languages: {},
        editors: {},
        operating_systems: {},
        categories: {},
        total_seconds: 0,
      };
    }

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
      }
    );
  }, [summary]);
};

// Main component
export default function WakaTimeAnalytics() {
  const { summary, loading, error } = useWakaTimeData();
  const aggregatedData = useAggregatedData(summary);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!summary) return <ErrorMessage message="No data available" />;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
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
          <p className="text-white/70 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Your comprehensive coding activity insights and development statistics
          </p>
        </div>

        {/* Overview */}
        <StatsOverview totalSeconds={aggregatedData.total_seconds} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
          <StatCard
            title="Programming Languages"
            icon={Code}
            data={aggregatedData.languages}
            total={aggregatedData.total_seconds}
          />
          <StatCard
            title="Code Editors"
            icon={Monitor}
            data={aggregatedData.editors}
            total={aggregatedData.total_seconds}
          />
          <StatCard
            title="Operating Systems"
            icon={Layers}
            data={aggregatedData.operating_systems}
            total={aggregatedData.total_seconds}
          />
          <StatCard
            title="Categories"
            icon={Layers}
            data={aggregatedData.categories}
            total={aggregatedData.total_seconds}
          />
        </div>

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
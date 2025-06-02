"use client";
import React, { useEffect, useState } from "react";
import { Clock, Code, Monitor, Layers, Award } from "lucide-react";

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

// Constants
const COLOR_PALETTE = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600",
  "from-amber-500 to-amber-600",
  "from-red-500 to-red-600",
  "from-cyan-500 to-cyan-600",
  "from-orange-500 to-orange-600",
  "from-teal-500 to-teal-600",
  "from-indigo-500 to-indigo-600",
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
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-300 animate-pulse">Loading WakaTime data...</p>
    </div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center max-w-md mx-auto p-6">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-red-400 mb-2">Error</h2>
      <p className="text-slate-300 mb-4">{message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

const ProgressBar = ({ percent, gradient }: { percent: number; gradient: string }) => (
  <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
    <div
      className={`h-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-out`}
      style={{ width: `${Math.min(percent, 100)}%` }}
    />
  </div>
);

const StatCard = ({ 
  title, 
  icon: Icon, 
  data, 
  total 
}: { 
  title: string; 
  icon: any; 
  data: Record<string, number>; 
  total: number; 
}) => {
  const entries = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  if (entries.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-700/50 rounded-lg">
            <Icon className="w-5 h-5 text-slate-300" />
          </div>
          <h2 className="text-lg font-semibold text-slate-200">{title}</h2>
        </div>
        <p className="text-slate-400 text-center py-8">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-700/50 rounded-lg">
          <Icon className="w-5 h-5 text-slate-300" />
        </div>
        <h2 className="text-lg font-semibold text-slate-200">{title}</h2>
      </div>
      
      <div className="space-y-4">
        {entries.map(([name, seconds], index) => {
          const percent = (seconds / total) * 100;
          const gradient = COLOR_PALETTE[index % COLOR_PALETTE.length];
          
          return (
            <div key={name} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                  {name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">
                    {formatDuration(seconds)}
                  </span>
                  <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded-full">
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
  <div className="text-center mb-12">
    <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
      <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
        <Clock className="w-8 h-8 text-white" />
      </div>
      <div className="text-left">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
          Total Coding Time
        </p>
        <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {formatDuration(totalSeconds)}
        </p>
        <p className="text-slate-500 text-sm">
          Last 7 days
        </p>
      </div>
    </div>
  </div>
);

// Custom hook for data fetching
const useWakaTimeData = () => {
  const [summary, setSummary] = useState<WakaTimeSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching data from /api/wakatime...');
        const response = await fetch("/api/wakatime");
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('❌ API Error:', errorData);
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Data received:', data);
        console.log('📊 Full data structure:', JSON.stringify(data, null, 2));
        console.log('📊 Data keys:', Object.keys(data));
        console.log('📊 Days count:', data.data?.length || 0);
        
        // Log sample data untuk debugging
        if (data.data && data.data.length > 0) {
          console.log('📈 Sample day data:', data.data[0]);
        } else {
          console.log('❌ No data.data or empty array');
          console.log('❌ Typeof data:', typeof data);
          console.log('❌ Is array?', Array.isArray(data));
        }
        
        setSummary(data);
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { summary, loading, error };
};

// Custom hook for data aggregation
const useAggregatedData = (summary: WakaTimeSummary | null): AggregatedData => {
  return React.useMemo(() => {
    console.log('🔄 Aggregating data...');
    console.log('Summary:', summary);
    
    if (!summary?.data?.length) {
      console.log('❌ No summary data found');
      return {
        languages: {},
        editors: {},
        operating_systems: {},
        categories: {},
        total_seconds: 0,
      };
    }

    console.log('📊 Processing', summary.data.length, 'days of data');

    const result = summary.data.reduce<AggregatedData>(
      (acc, day, index) => {
        console.log(`📅 Day ${index + 1}:`, day.range?.date, 'Total:', day.grand_total?.total_seconds || 0);
        
        // Aggregate languages
        day.languages?.forEach(lang => {
          acc.languages[lang.name] = (acc.languages[lang.name] || 0) + lang.total_seconds;
        });
        
        // Aggregate editors
        day.editors?.forEach(editor => {
          acc.editors[editor.name] = (acc.editors[editor.name] || 0) + editor.total_seconds;
        });
        
        // Aggregate operating systems
        day.operating_systems?.forEach(os => {
          acc.operating_systems[os.name] = (acc.operating_systems[os.name] || 0) + os.total_seconds;
        });
        
        // Aggregate categories
        day.categories?.forEach(category => {
          acc.categories[category.name] = (acc.categories[category.name] || 0) + category.total_seconds;
        });
        
        // Add to total seconds
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

    console.log('✅ Aggregation complete:');
    console.log('- Total seconds:', result.total_seconds);
    console.log('- Languages:', Object.keys(result.languages).length);
    console.log('- Editors:', Object.keys(result.editors).length);
    console.log('- OS:', Object.keys(result.operating_systems).length);
    console.log('- Categories:', Object.keys(result.categories).length);

    return result;
  }, [summary]);
};

// Main component
export default function StatsPage() {
  const { summary, loading, error } = useWakaTimeData();
  const aggregatedData = useAggregatedData(summary);

  console.log('🎨 Render state:', { loading, error: !!error, hasData: !!summary });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!summary) return <ErrorMessage message="No data available" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Award className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              WakaTime Analytics
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Your coding activity insights for the past week
          </p>
        </div>

        {/* Debug Info */}
        <div className="mb-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <h3 className="text-slate-300 font-semibold mb-2">Debug Info:</h3>
          <div className="text-sm text-slate-400 space-y-1">
            <p>Days loaded: {summary?.data?.length || 0}</p>
            <p>Total seconds: {aggregatedData.total_seconds}</p>
            <p>Languages: {Object.keys(aggregatedData.languages).length}</p>
            <p>Editors: {Object.keys(aggregatedData.editors).length}</p>
          </div>
        </div>

        {/* Overview */}
        <StatsOverview totalSeconds={aggregatedData.total_seconds} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
        <div className="text-center mt-16 pt-8 border-t border-slate-700/50">
          <p className="text-slate-500 text-sm">
            Data powered by{" "}
            <a 
              href="https://wakatime.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              WakaTime
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
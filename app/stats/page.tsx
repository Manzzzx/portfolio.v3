"use client";
import React, { useEffect, useState } from "react";

type WakaTimeSummary = {
  data: Array<{
    languages: Array<{ name: string; total_seconds: number; percent: number }>;
    editors: Array<{ name: string; total_seconds: number; percent: number }>;
    operating_systems: Array<{ name: string; total_seconds: number; percent: number }>;
    categories: Array<{ name: string; total_seconds: number; percent: number }>;
    grand_total: { text: string; total_seconds: number };
    range: { date: string };
  }>;
};

function secondsToHms(d: number) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  return `${h}h ${m}m`;
}

const colorList = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-indigo-500",
];

export default function StatsPage() {
  const [summary, setSummary] = useState<WakaTimeSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/wakatime")
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!summary) return <div className="p-8">Tidak ada data</div>;

  // Aggregate data
  const aggregate = summary.data.reduce(
    (acc, day) => {
      day.languages.forEach(lang => {
        acc.languages[lang.name] = (acc.languages[lang.name] || 0) + lang.total_seconds;
      });
      day.editors.forEach(ed => {
        acc.editors[ed.name] = (acc.editors[ed.name] || 0) + ed.total_seconds;
      });
      day.operating_systems.forEach(os => {
        acc.operating_systems[os.name] = (acc.operating_systems[os.name] || 0) + os.total_seconds;
      });
      day.categories.forEach(cat => {
        acc.categories[cat.name] = (acc.categories[cat.name] || 0) + cat.total_seconds;
      });
      acc.total_seconds += day.grand_total.total_seconds;
      return acc;
    },
    {
      languages: {} as Record<string, number>,
      editors: {} as Record<string, number>,
      operating_systems: {} as Record<string, number>,
      categories: {} as Record<string, number>,
      total_seconds: 0,
    }
  );

  // Helper for progress bar
  function ProgressBar({ percent, color }: { percent: number; color: string }) {
    return (
      <div className="w-full h-2 bg-gray-800 rounded">
        <div
          className={`${color} h-2 rounded`}
          style={{ width: `${percent}%`, transition: "width 0.5s" }}
        />
      </div>
    );
  }

  // Helper for section
  function StatSection({
    title,
    data,
    total,
  }: {
    title: string;
    data: Record<string, number>;
    total: number;
  }) {
    const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    return (
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-blue-200">{title}</h2>
        <div className="space-y-3">
          {entries.map(([name, sec], idx) => {
            const percent = total ? (sec / total) * 100 : 0;
            const color = colorList[idx % colorList.length];
            return (
              <div key={name} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-blue-100">{name}</span>
                  <span className="text-xs text-gray-300 bg-gray-800 px-2 py-0.5 rounded-full ml-2">
                    {secondsToHms(sec)} ({percent.toFixed(1)}%)
                  </span>
                </div>
                <ProgressBar percent={percent} color={color} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-100 text-center drop-shadow">
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          WakaTime Stats
        </span>
        <span className="block text-base font-normal text-blue-200 mt-2">
          (7 Hari Terakhir)
        </span>
      </h1>
      <div className="mb-10 flex flex-col items-center">
        <span className="text-lg text-blue-200 mb-1">Total Waktu Coding</span>
        <span className="text-4xl font-extrabold text-blue-300 drop-shadow">
          {secondsToHms(aggregate.total_seconds)}
        </span>
      </div>
      <StatSection
        title="Languages"
        data={aggregate.languages}
        total={aggregate.total_seconds}
      />
      <StatSection
        title="Editors"
        data={aggregate.editors}
        total={aggregate.total_seconds}
      />
      <StatSection
        title="Operating Systems"
        data={aggregate.operating_systems}
        total={aggregate.total_seconds}
      />
      <StatSection
        title="Categories"
        data={aggregate.categories}
        total={aggregate.total_seconds}
      />
    </div>
  );
}
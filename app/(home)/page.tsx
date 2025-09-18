"use client";

import { Loader } from "@/shared/components";
import { LogLevelFilter, LogList } from "./_components";
import { fetchLogs } from "./_utils";
import useSWR from "swr";
import { notFound } from "next/navigation";
import { useMemo, useState } from "react";

export default function Home() {
  const { data: logs = [], error, isLoading } = useSWR("/api/logs", fetchLogs);
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const filteredLogs = useMemo(() => {
    if (!selectedLevel || selectedLevel.length === 0) return logs;
    return logs.filter((log) => log.level === selectedLevel);
  }, [logs, selectedLevel]);

  // Create unique category list for levels and filter empty strings
  const uniqueLevels = useMemo(
    () =>
      [
        ...new Set(
          logs
            .map((log) => log.level)
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        ),
      ].filter((level) => level !== ""),
    [logs]
  );

  const handleSelectLevel = (level: string) => {
    if (level === selectedLevel) return setSelectedLevel("");
    setSelectedLevel(level);
  };

  if (isLoading)
    return (
      <div className="min-h-screen">
        <Loader message="Fetching logs" />
      </div>
    );
  if (!isLoading && !logs) return notFound();
  if (error) return <p>Error loading logs: {error.message}</p>;

  return (
    <section id="home-page" className="min-h-screen flex flex-col gap-8">
      <LogLevelFilter
        levels={uniqueLevels}
        selectedLevel={selectedLevel}
        levelOnClick={handleSelectLevel}
      />
      <LogList logs={filteredLogs} />
    </section>
  );
}

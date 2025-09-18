"use client";

import { Loader } from "@/shared/components";
import { LogLevelFilter, LogList, LogSearch } from "./_components";
import { fetchLogs } from "./_utils";
import useSWR from "swr";
import { notFound } from "next/navigation";
import { useMemo, useState } from "react";

export default function Home() {
  const {
    data: logs = [],
    error,
    isLoading,
  } = useSWR("/api/logs", fetchLogs, {
    revalidateOnFocus: false, //. To avoid re-new the data when windows is focus.
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const filteredLogs = useMemo(() => {
    let filteredLogs = logs;
    if (searchValue) {
      filteredLogs = filteredLogs.filter((fLog) => {
        return Object.entries(fLog).some(([, value]) => {
          console.log("🚀 ~ Home ~ value:", value);
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchValue.toLowerCase());
          }
          return null;
        });
      });
    }
    if (selectedLevel) {
      filteredLogs = filteredLogs.filter((log) => log.level === selectedLevel);
    }
    return filteredLogs;
  }, [logs, selectedLevel, searchValue]);

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

  const handleOnSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  };

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
    <section id="home-page" className="min-h-screen">
      <div className="flex flex-col gap-8">
        <LogSearch searchValue={searchValue} onSearch={handleOnSearch} />
        <LogLevelFilter
          levels={uniqueLevels}
          selectedLevel={selectedLevel}
          levelOnClick={handleSelectLevel}
        />
        <LogList logs={filteredLogs} />
      </div>
    </section>
  );
}

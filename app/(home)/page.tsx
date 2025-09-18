"use client";

import { Loader } from "@/shared/components";
import {
  LogDateFilter,
  LogLevelFilter,
  LogList,
  LogSearch,
} from "./_components";
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
    refreshInterval: 0, // Also disable interval revalidation
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
  const timestamps = useMemo(() => logs.map((log) => log.timestamp), [logs]);

  const handleOnSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const handleSelectLevel = (level: string) => {
    if (level === selectedLevel) return setSelectedLevel("");
    setSelectedLevel(level);
  };

  const handleSelectOnDate = (date: string) => {
    console.log("🚀 ~ handleSelectOnDate ~ date:", date);
  };

  if (isLoading)
    return (
      <div className="min-h-screen">
        <Loader message="Fetching logs" />
      </div>
    );
  if (error) return <p>Error loading logs: {error.message}</p>;
  if (!isLoading && !error && !logs) return notFound();

  return (
    <section id="home-page" className="min-h-screen">
      <div className="flex flex-col gap-8">
        <LogSearch searchValue={searchValue} onSearch={handleOnSearch} />
        <div className="flex flex-col gap-2 m-auto xs:flex-row">
          <LogLevelFilter
            levels={uniqueLevels}
            selectedLevel={selectedLevel}
            levelOnClick={handleSelectLevel}
          />
          <LogDateFilter
            timestamps={timestamps}
            onDateSelect={handleSelectOnDate}
          />
        </div>
        <LogList logs={filteredLogs} />
      </div>
    </section>
  );
}

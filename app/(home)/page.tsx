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
  /**
   * SWR Configuration:
   * - revalidateOnFocus: false - Prevents refetching when browser tab gains focus
   * - refreshInterval: 0 - Disables automatic periodic revalidation
   * - Default value = [] prevents undefined errors during initial loading
   */
  const {
    data: logs = [],
    error,
    isLoading,
  } = useSWR("logs", fetchLogs, {
    revalidateOnFocus: false, //. To avoid re-new the data when windows is focus.
    refreshInterval: 0, // Also disable interval revalidation
  });

  // State Management for Filtering - Each filter operates independently
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  /**
   * useMemo for Performance Optimization:
   * - Memoizes expensive filtering operations
   * - Only recalculates when dependencies (logs, filters) change
   * - Prevents unnecessary re-renders and computations
   */
  const filteredLogs = useMemo(() => {
    let filteredLogs = logs;

    // Search Filter: Checks all object properties for string matches
    if (searchValue) {
      filteredLogs = filteredLogs.filter((fLog) => {
        return Object.entries(fLog).some(([, value]) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchValue.toLowerCase());
          }
          return null;
        });
      });
    }

    // Level Filter: Exact match comparison
    if (selectedLevel) {
      filteredLogs = filteredLogs.filter((log) => log.level === selectedLevel);
    }

    // Date Filter: Converts timestamp to locale date string for comparison
    if (selectedDate) {
      filteredLogs = filteredLogs.filter((log) => {
        const fixedString = log.timestamp.replace(
          /\s+([-+]\d{2}:\d{2})$/,
          "$1"
        );
        const logDate = new Date(fixedString).toLocaleDateString();
        return logDate === selectedDate;
      });
    }

    return filteredLogs;
  }, [logs, selectedLevel, searchValue, selectedDate]);

  /**
   * Create Unique Sorted Levels:
   * - Uses Set to remove duplicates
   * - Sorts alphabetically (case-insensitive)
   * - Filters out empty strings to prevent UI issues
   */
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

  // Extract timestamps for date filtering - memoized to prevent recreation
  const timestamps = useMemo(
    () => filteredLogs.map((log) => log.timestamp),
    [filteredLogs]
  );

  const handleOnSearch = (searchValue: string) => setSearchValue(searchValue);

  // Toggle Logic: Click same level to deselect, different level to select
  const handleSelectLevel = (level: string) => {
    if (level === selectedLevel) return setSelectedLevel("");
    setSelectedLevel(level);
  };

  const handleSelectOnDate = (date: string) => setSelectedDate(date);

  // Reset all filters to initial state
  const handleResetFilters = () => {
    setSearchValue("");
    setSelectedLevel("");
    setSelectedDate("");
  };

  /**
   * Loading States & Error Handling:
   * - Early returns prevent rendering main content during loading/error states
   * - notFound() triggers Next.js 404 page when data is empty
   */
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
      <div className="flex flex-col gap-4">
        <LogSearch searchValue={searchValue} onSearch={handleOnSearch} />

        <div className="flex flex-col items-center gap-4 m-auto xs:flex-row mb-8">
          <LogLevelFilter
            levels={uniqueLevels}
            selectedLevel={selectedLevel}
            levelOnClick={handleSelectLevel}
          />

          <div className="flex gap-4">
            <LogDateFilter
              timestamps={timestamps}
              onDateSelect={handleSelectOnDate}
            />
            <button
              className="bg-primary-500 w-max text-primary-50 cursor-pointer hover:bg-primary-600 px-2 py-1 rounded-md transition-colors duration-300"
              onClick={handleResetFilters}
            >
              Clear
            </button>
          </div>
        </div>

        <LogList logs={filteredLogs} />
      </div>
    </section>
  );
}

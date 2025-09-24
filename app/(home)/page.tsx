"use client";

import { Loader } from "@/shared/components";
import {
  LogDateFilter,
  LogLevelFilter,
  LogList,
  LogSearch,
} from "./_components";
import { fetchLogs, setUniqueLevels } from "./_utils";
import useSWR from "swr";
import { useMemo } from "react";
import { useDebounce } from "@/shared/hooks";
import { filterLogs } from "./_utils/filter-logs";
import { useFiltersFromSearchParams } from "./_hooks";

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
  const { filters, setFilter, resetFilter } = useFiltersFromSearchParams();
  const debouncedSearchValue = useDebounce(filters.search, 300);

  /**
   * useMemo for Performance Optimization:
   * - Memoizes expensive filtering operations
   * - Only recalculates when dependencies (logs, filters) change
   * - Prevents unnecessary re-renders and computations
   */
  const filteredLogs = useMemo(
    () =>
      filterLogs(logs, {
        searchValue: debouncedSearchValue,
        level: filters.level,
        date: filters.date,
      }),
    [logs, debouncedSearchValue, filters.level, filters.date]
  );

  /**
   * Create Unique Sorted Levels:
   * - Uses Set to remove duplicates
   * - Sorts alphabetically (case-insensitive)
   * - Filters out empty strings to prevent UI issues
   */
  const uniqueLevels = useMemo(() => setUniqueLevels(logs), [logs]);

  // Extract timestamps for date filtering - memoized to prevent recreation
  const timestamps = useMemo(() => logs.map((log) => log.timestamp), [logs]);

  const handleOnSearch = (searchValue: string) => {
    setFilter("search", searchValue);
  };
  // Toggle Logic: Click same level to deselect, different level to select
  const handleSelectLevel = (levelValue: string) => {
    setFilter("level", levelValue === filters.level ? "" : levelValue);
  };

  const handleSelectOnDate = (dateValue: string) => {
    setFilter("date", dateValue);
  };

  // Reset all filters to initial state
  const handleResetFilters = () => resetFilter();

  /**
   * Loading States & Error Handling:
   * - Early returns prevent rendering main content during loading/error states
   * - notFound() triggers Next.js 404 page when data is empty
   */
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Loader message="Fetching logs..." />
      </div>
    );
  }
  if (error) return <p>Error loading logs: {error.message}</p>;
  // if (!isLoading && !error && !logs) return notFound();

  return (
    <section id="home-page" className="min-h-screen">
      <div className="flex flex-col gap-4">
        <LogSearch searchValue={filters.search} onSearch={handleOnSearch} />

        <div className="flex flex-col items-center gap-4 m-auto xs:flex-row mb-8">
          <LogLevelFilter
            levels={uniqueLevels}
            selectedLevel={filters.level}
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

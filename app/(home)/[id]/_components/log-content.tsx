"use client";

import { Loader } from "@/shared/components";
import { Log } from "@/shared/types";
import classNames from "classnames";
import { Info, TriangleAlert, OctagonX, Rocket, Eye } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";

interface LogContentProps {
  id: string; // authorId
}
export default function LogContent({ id }: LogContentProps) {
  /**
   * Cache Access Pattern:
   * - useSWRConfig provides global cache access
   * - Cache persists across page navigation
   * - No need to re-fetch data when navigating from list to detail
   */
  const { cache } = useSWRConfig();
  const cachedLogs = cache.get("/api/logs");

  // Local State Management for Detail View
  const [log, setLog] = useState<Log | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  /**
   * Cache Validation & Data Extraction:
   * - Validates cache exists to prevent errors
   * - Finds specific log by authorId from cached data
   * - Sets loading state appropriately
   */
  useEffect(() => {
    if (!cachedLogs || cachedLogs === undefined) {
      setIsLoading(false);
      return setError(
        "We lost our cache data, please go back to your home page"
      );
    }
    const cachedData = cachedLogs?.data as Log[];
    const foundLog = cachedData.find((log) => log.authorId === id);
    setLog(foundLog);
    setIsLoading(false);
  }, [cachedLogs, id]);

  /**
   * Early Return Pattern for Different States:
   * - Loading: Shows spinner with dynamic message
   * - Error: User-friendly error message for cache miss
   * - Not Found: Triggers Next.js 404 page
   * - Null Guard: Additional safety check
   */
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Loader message={`Fetching log detail from ${id}`} />
      </div>
    );
  }
  if (error) {
    return <p className="text-center text-gray-500">{error}</p>;
  }
  if (!isLoading && !error && !log) return notFound();
  if (!log) return null;

  const { authorId, level, message, source, timestamp } = log;

  const Icon =
    (level === "info" && Info) ||
    (level === "warn" && TriangleAlert) ||
    (level === "error" && OctagonX) ||
    (level === "debug" && Rocket) ||
    Eye;

  const getIconColor =
    (level === "info" && "text-blue-600") ||
    (level === "warn" && "text-orange-400") ||
    (level === "error" && "text-red-500") ||
    (level === "debug" && "text-primary-900") ||
    "text-gray-600";

  const containerStyles = classNames(
    "w-full border rounded-lg overflow-hidden border-2",
    (level === "info" && "border-blue-600") ||
      (level === "warn" && "border-orange-400") ||
      (level === "error" && "border-red-500") ||
      (level === "debug" && "border-primary-900") ||
      "border-gray-600"
  );

  const topStyles = classNames(
    "w-full flex justify-between items-center gap-4 p-4",
    (level === "info" && "bg-blue-200") ||
      (level === "warn" && "bg-orange-200") ||
      (level === "error" && "bg-red-200") ||
      (level === "debug" && "bg-primary-100") ||
      "bg-gray-200"
  );

  return (
    <div className={containerStyles}>
      <div className={topStyles}>
        {Icon ? <Icon className={getIconColor} /> : <span className="flex-1" />}
        <p className="text-sm md:text-lg">
          {new Date(timestamp).toLocaleString()}
        </p>
      </div>

      <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-96">
        <div className="p-4 bg-white text-gray-700">
          <p>
            <strong>Author id:</strong> {authorId}
          </p>
          <p>
            <strong>Message:</strong> {message}
          </p>
          <p className="mb-4">
            <strong>Source:</strong> {source}
          </p>
        </div>
      </div>
    </div>
  );
}

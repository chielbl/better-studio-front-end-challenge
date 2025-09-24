"use client";

import { Loader } from "@/shared/components";
import { Log } from "@/shared/types";
import { localStore } from "@/shared/utils";
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
  const cachedLogs = cache.get("logs");

  // Local State Management for Detail View
  const [log, setLog] = useState<Log | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  /**
   * Cache Validation & Data Extraction:
   * - Attempt to retrieve data from localStorage first (client-side only)
   * - If available, use it immediately and end loading
   * - If no localStorage  validate global cache presence
   * - Search for the log item in cache by authorId
   * - Update state with found log or set error if not found
   * - Ensure loading state is updated at the end
   */
  useEffect(() => {
    const logDetail = localStore.get<Log>("logDetail");
    if (logDetail) {
      setLog(logDetail);
      setIsLoading(false);
      return;
    }

    if (!cachedLogs) {
      setError("We lost our cache data, please go back to your home page");
      setIsLoading(false);
      localStore.set("logDetail", undefined);
      return;
    }

    const cachedData = cachedLogs.data as Log[];
    const foundLog = cachedData.find((log) => log.authorId === id);
    if (!foundLog) {
      setError(`Log with id: ${id}, not found!`);
      localStore.set("logDetail", undefined);
    } else {
      setLog(foundLog);
      localStore.set<Log>("logDetail", foundLog);
    }

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
  const fixedString = timestamp.replace(/\s+([-+]\d{2}:\d{2})$/, "$1");
  const date = new Date(fixedString).toLocaleString();

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
        <p className="text-sm md:text-lg">{date}</p>
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

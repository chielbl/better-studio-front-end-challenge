"use client";

import { useMemo, useState } from "react";
import { Log } from "../types";
import LogItem from "./log-item";
import LogLevelFilter from "./log-level-filter";

interface LogListProps {
  logs: Log[];
}
export default function UserList({ logs }: LogListProps) {
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

  return (
    <div className="flex flex-col gap-10">
      <LogLevelFilter
        levels={uniqueLevels}
        selectedLevel={selectedLevel}
        levelOnClick={handleSelectLevel}
      />
      <div className="flex flex-col gap-6 m-auto max-w-7xl">
        {filteredLogs.map((log) => (
          <LogItem key={log.authorId} logData={log} />
        ))}
      </div>
    </div>
  );
}

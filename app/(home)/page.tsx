"use client";

import { useState, useEffect } from "react";
import { LogList } from "./_components";
import { Log } from "@/shared/types";
import { fetchLogs } from "./_utils";

export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const loadLogs = async () => {
      const logsData = await fetchLogs();
      setLogs(logsData);
    };

    loadLogs();
  }, []);

  return (
    <section id="home-page">
      <LogList logs={logs} />
    </section>
  );
}

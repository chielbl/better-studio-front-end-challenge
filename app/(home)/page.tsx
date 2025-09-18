"use client";

import { Loader } from "@/shared/components";
import { LogList } from "./_components";
import { fetchLogs } from "./_utils";
import useSWR from "swr";
import { notFound } from "next/navigation";

export default function Home() {
  const { data: logs, error, isLoading } = useSWR("/api/logs", fetchLogs);

  if (isLoading)
    return (
      <div className="min-h-screen">
        <Loader message="Fetching logs" />
      </div>
    );
  if (!logs) return notFound();
  if (error) return <p>Error loading logs: {error.message}</p>;

  return (
    <section id="home-page" className="min-h-screen">
      <LogList logs={logs} />
    </section>
  );
}

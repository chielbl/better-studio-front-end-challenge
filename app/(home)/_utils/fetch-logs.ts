import { Log } from "@/shared/types";

export async function fetchLogs(): Promise<Log[]> {
  const response = await fetch("/api/logs");

  if (!response.ok) {
    throw new Error(`Error fetching logs: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

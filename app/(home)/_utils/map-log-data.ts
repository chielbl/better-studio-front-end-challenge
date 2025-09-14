import { Log } from "../types/Log";

export function mapLogData(logData: string): Log {
  // Split on "|=|" separator
  const parts = logData.split("|=|");

  return {
    timestamp: parts[0] ? parts[0].trim() : "",
    message: parts[1] ? parts[1].trim() : "",
    level: parts[2] ? parts[2].trim().toLocaleLowerCase() : "",
    source: parts[3] ? parts[3].trim() : "",
    authorId: parts[4] ? parts[4].trim() : "",
  };
}

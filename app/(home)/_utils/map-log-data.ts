export interface LogData {
  timestamp: string;
  message: string;
  level: string;
  source: string;
  authorId: string;
}

export function mapLogData(logData: string): LogData {
  // Split on "|=|" separator
  const parts = logData.split("|=|");

  if (parts.length !== 5) {
    throw new Error(
      `Invalid log format. Expected 5 parts, got ${parts.length}`
    );
  }

  return {
    timestamp: parts[0].trim(),
    message: parts[1].trim(),
    level: parts[2].trim().toLocaleLowerCase(),
    source: parts[3].trim(),
    authorId: parts[4].trim(),
  };
}

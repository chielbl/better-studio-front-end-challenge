import { Log } from "@/shared/types";

export function setUniqueLevels(logs: Log[]) {
  return [
    ...new Set(
      logs
        .map((log) => log.level)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    ),
  ].filter((level) => level !== "");
}

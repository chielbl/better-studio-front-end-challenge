import { Log } from "@/shared/types";

function filterLogsOnSearch(logs: Log[], searchValue?: string) {
  if (!searchValue || searchValue.length === 0) return logs;
  // Search Filter: Checks only on "message", "sources" and "authorId"
  return logs.filter(
    (log) =>
      log.message.toLowerCase().includes(searchValue.toLowerCase()) ||
      log.source.toLowerCase().includes(searchValue.toLowerCase()) ||
      log.authorId.toLowerCase().includes(searchValue.toLowerCase())
  );
}

function filterLogsOnLevel(logs: Log[], level?: string) {
  if (!level || level.length === 0) return logs;
  return logs.filter((log) => log.level === level);
}

function filterLogsOnDate(logs: Log[], date?: string) {
  if (!date || date.length === 0) return logs;
  return logs.filter((log) => {
    const fixedString = log.timestamp.replace(/\s+([-+]\d{2}:\d{2})$/, "$1");
    const logDate = new Date(fixedString).toLocaleDateString();
    return logDate === date;
  });
}

type FilterParams = {
  searchValue?: string;
  level?: string;
  date?: string;
};
export function filterLogs(logs: Log[], filterParams: FilterParams) {
  const { searchValue, level, date } = filterParams;
  if (!searchValue && !level && !date) return logs;

  let filteredLogs = logs;
  filteredLogs = filterLogsOnSearch(filteredLogs, searchValue);
  filteredLogs = filterLogsOnLevel(filteredLogs, level);
  filteredLogs = filterLogsOnDate(filteredLogs, date);

  return filteredLogs;
}

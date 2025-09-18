import LogItem from "./log-item";
import { Log } from "@/shared/types";

interface LogListProps {
  logs: Log[];
}
export default function UserList({ logs }: LogListProps) {
  return (
    <div className="flex flex-col gap-12 xl:w-6xl xl:m-auto">
      {logs.map((log) => (
        <LogItem key={log.authorId} logData={log} />
      ))}
    </div>
  );
}

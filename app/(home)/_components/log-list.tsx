import { Log } from "../types";
import LogItem from "./log-item";

interface LogListProps {
  logs: Log[];
}
export default function UserList({ logs }: LogListProps) {
  return (
    <div className="flex flex-col gap-8 m-auto max-w-5xl">
      {logs.map((log) => (
        <LogItem key={log.authorId} logData={log} />
      ))}
    </div>
  );
}

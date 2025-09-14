import Link from "next/link";
import {
  Bell,
  ChevronRight,
  Info,
  OctagonX,
  Rocket,
  TriangleAlert,
} from "lucide-react";
import { Log } from "../types";

interface LogItemProps {
  logData: Log;
}
export default function LogItem({ logData }: LogItemProps) {
  const { authorId, timestamp, level, message, source } = logData;

  const Icon =
    (level === "info" && Info) ||
    (level === "warn" && TriangleAlert) ||
    (level === "error" && OctagonX) ||
    (level === "debug" && Rocket) ||
    Bell;

  return (
    <Link
      href={`/${authorId}`}
      className="flex justify-between items-center gap-4 p-4 bg-primary-100 rounded-md  duration-300 transition-all hover:translate-x-2 hover:bg-primary-200"
    >
      <Icon />
      <p>{timestamp}</p>
      <p>{message}</p>
      <p>{source}</p>
      <span>
        <ChevronRight size={24} />
      </span>
    </Link>
  );
}

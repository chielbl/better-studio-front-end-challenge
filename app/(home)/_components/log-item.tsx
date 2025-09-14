import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Log } from "../types";

interface LogItemProps {
  logData: Log;
}
export default function LogItem({ logData }: LogItemProps) {
  const { authorId, timestamp, level, message, source } = logData;
  return (
    <Link
      href={`/${authorId}`}
      className="flex justify-between p-4 bg-primary-100 rounded-md  duration-300 transition-all hover:translate-x-2 hover:bg-primary-200"
    >
      <p>{level}</p>
      <p>{timestamp}</p>
      <p>{message}</p>
      <p>{source}</p>
      <span>
        <ChevronRight size={24} />
      </span>
    </Link>
  );
}

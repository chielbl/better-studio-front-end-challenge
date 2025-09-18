import { Bell, Info, OctagonX, Rocket, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Log } from "@/shared/types";
import classNames from "classnames";

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

  const getIconColor =
    (level === "info" && "text-blue-600") ||
    (level === "warn" && "text-orange-400") ||
    (level === "error" && "text-red-500") ||
    (level === "debug" && "text-primary-900") ||
    "text-gray-600";

  const containerStyles = classNames(
    "w-full border rounded-lg overflow-hidden border-2",
    (level === "info" && "border-blue-600") ||
      (level === "warn" && "border-orange-400") ||
      (level === "error" && "border-red-500") ||
      (level === "debug" && "border-primary-900") ||
      "border-gray-600"
  );

  const topStyles = classNames(
    "w-full flex justify-between items-center gap-4 p-4",
    (level === "info" && "bg-blue-200") ||
      (level === "warn" && "bg-orange-200") ||
      (level === "error" && "bg-red-200") ||
      (level === "debug" && "bg-primary-100") ||
      "bg-gray-200"
  );

  return (
    <div className={containerStyles}>
      <div className={topStyles}>
        <Icon className={getIconColor} />
        <p className="text-sm md:text-lg">{timestamp}</p>
      </div>

      <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-96">
        <div className="p-4 bg-white text-gray-700">
          <p>
            <strong>Author id:</strong> {authorId}
          </p>
          <p>
            <strong>Message:</strong> {message}
          </p>
          <p>
            <strong>Source:</strong> {source}
          </p>
        </div>
      </div>
    </div>
  );
}

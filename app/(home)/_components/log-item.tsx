"use client";

import {
  Bell,
  ChevronDown,
  Info,
  OctagonX,
  Rocket,
  TriangleAlert,
} from "lucide-react";
import { Log } from "../types";
import { useState } from "react";
import Link from "next/link";

interface LogItemProps {
  logData: Log;
}
export default function LogItem({ logData }: LogItemProps) {
  const { authorId, timestamp, level, message, source } = logData;

  const [isOpen, setIsOpen] = useState(false);

  const Icon =
    (level === "info" && Info) ||
    (level === "warn" && TriangleAlert) ||
    (level === "error" && OctagonX) ||
    (level === "debug" && Rocket) ||
    Bell;

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full border border-primary-400 rounded-lg overflow-hidden">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center gap-4 p-4 bg-primary-100 transition-colors cursor-pointer hover:bg-primary-200"
      >
        <Icon />
        <p className="text-sm md:text-lg">{timestamp}</p>
        <ChevronDown
          size={24}
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-white text-gray-700">
          <p>
            <strong>Author id:</strong> {authorId}
          </p>
          <p>
            <strong>Time:</strong> {timestamp}
          </p>
          <p>
            <strong>Message:</strong> {message}
          </p>
          <p className="mb-4">
            <strong>Source:</strong> {source}
          </p>
          <Link href={`/${authorId}`} className="underline text-primary-600">
            Show more info
          </Link>
        </div>
      </div>
    </div>
  );
}

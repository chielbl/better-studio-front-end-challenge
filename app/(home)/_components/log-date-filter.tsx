"use client";

import { useState } from "react";

interface LogDateFilterProps {
  timestamps: string[];
  onDateSelect: (selectedDate: string) => void;
  placeholder?: string;
}

export default function LogDateFilter({
  timestamps,
  onDateSelect,
  placeholder = "Select a date",
}: LogDateFilterProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const getUniqueDates = (timestamps: string[]) => {
    const dates = timestamps.map((timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    });

    // Filter unique dates
    return [...new Set(dates)];
  };

  const uniqueDates = getUniqueDates(timestamps);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedDate(selectedValue);
    onDateSelect(selectedValue);
  };

  return (
    <select
      value={selectedDate}
      onChange={handleDateChange}
      className="px-2 py-1 border border-solid border-primary-400 rounded-full"
    >
      <option value="">{placeholder}</option>
      {uniqueDates.map((date) => (
        <option key={date} value={date}>
          {date}
        </option>
      ))}
    </select>
  );
}

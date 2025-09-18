"use client";

interface LoadingProps {
  message?: string;
}
export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="p-1 animate-spin drop-shadow-2xl bg-gradient-to-bl from-primary-300 via-primary-500 to-primary-700 h-12 w-12 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-primary-50 background-blur-md"></div>
      </div>
      <p className="font-bold">{message}</p>
    </div>
  );
}

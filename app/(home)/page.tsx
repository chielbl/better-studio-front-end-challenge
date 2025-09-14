import { notFound } from "next/navigation";
import { LogList } from "./_components";
import { mapLogData } from "./_utils";

const fetchLogs = async () => {
  const response = await fetch("https://challenges.betterstudio.io/logs", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-api-key": `${process.env.API_KEY_LOGS}`,
    },
  });

  const reader = response.body?.getReader();

  if (!reader) {
    throw new Error("No readable stream");
  }

  const decoder = new TextDecoder();

  try {
    const { value } = await reader.read();

    if (value === undefined) return notFound();

    // Decode chunk
    const chunk = decoder.decode(value, { stream: true });
    const parsedLogs = chunk.replaceAll(`"`, "").replaceAll("[", "").split(",");

    return parsedLogs.map(mapLogData);
  } finally {
    reader.releaseLock();
  }
};

export default async function Home() {
  const logs = await fetchLogs();

  return (
    <section id="home-page">
      <LogList logs={logs} />
    </section>
  );
}

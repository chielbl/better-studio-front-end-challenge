import { notFound } from "next/navigation";
import { mapLogData } from "./_utils/map-log-data";

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

    if (!value) return notFound();

    // Decode chunk
    const chunk = decoder.decode(value, { stream: true });
    const parsedLogs = chunk.replaceAll(`"`, "").split(",");

    return parsedLogs.map(mapLogData);
  } finally {
    reader.releaseLock();
  }
};

export default async function Home() {
  const logs = await fetchLogs();
  console.log("🚀 ~ Home ~ logs:", logs);
  return <section>home</section>;
}

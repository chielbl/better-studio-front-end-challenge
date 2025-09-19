import { NextResponse } from "next/server";
import { mapLogData } from "./_utils";

export async function GET() {
  const response = await fetch("https://challenges.betterstudio.io/logs", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-api-key": process.env.API_KEY_LOGS || "",
    },
  });
  if (!response.ok) {
    return new Response(null, { status: 404 });
  }

  const reader = response.body?.getReader();
  if (!reader) {
    return NextResponse.json({ error: "No readable stream" }, { status: 500 });
  }

  const decoder = new TextDecoder();

  try {
    const { value } = await reader.read();
    if (value === undefined) {
      return new Response(null, { status: 404 });
    }

    // Decode chunk
    const chunk = decoder.decode(value, { stream: true });
    if (!chunk || chunk.length === 0) {
      return new Response(null, { status: 404 });
    }

    const formattedLogs = chunk
      .replaceAll(`"`, "")
      .replaceAll("[", "")
      .split(",");

    const mappedLogs = formattedLogs.map(mapLogData);

    return NextResponse.json(mappedLogs);
  } finally {
    reader.releaseLock();
  }
}

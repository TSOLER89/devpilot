export async function sendChatMessage(message, previousResponseId) {
  const response = await fetch(
    "https://localhost:7040/api/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        previousResponseId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Could not connect to DevPilot API.");
  }

  return await response.json();
}
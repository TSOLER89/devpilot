const API_URL = "https://localhost:7040/api/chat";

export async function sendChatMessage(message) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not connect to DevPilot API.");
  }

  return await response.json();
}
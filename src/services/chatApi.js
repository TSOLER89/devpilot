const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export async function sendChatMessage(message, previousResponseId) {
  const response = await fetch(
    `${API_BASE_URL}/api/chat`,
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
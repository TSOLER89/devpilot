const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export async function sendChatMessage(
  message, 
  previousResponseId,
  mode,
  topic,
) 
{
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
        mode,
        topic,
      }),
    }
  );

  if (!response.ok) {
    let errorMessage = "DevPilot could not complete the request.";

    try {
      const errorData = await response.json();

      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Keep the default error message
    }

    throw new Error(errorMessage);
  }

  return await response.json();
}
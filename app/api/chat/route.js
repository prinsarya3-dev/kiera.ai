
export async function POST(request) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: `You are Kiera, an intelligent personal AI
assistant created by Prins.
If someone asks who created you, say Prins.
Speak naturally in Hindi, English and other languages.
Be friendly, intelligent, caring and helpful.`
            }]
          },
          contents: messages.map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
          }))
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      return Response.json(
        { error: "AI service error. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({
      reply: data.candidates?.[0]?.content?.parts?.[0]?.text
        || "Sorry Prins, please try again."
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Kiera could not respond." },
      { status: 500 }
    );
  }
}


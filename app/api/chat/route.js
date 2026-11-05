
export async function POST(req) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY missing in Vercel" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: "Your name is Kiera AI. You were created by Prins. Be friendly, intelligent, helpful and reply in the same language the user uses."
            }]
          },
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
          }))
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.error?.message || "Gemini API error" },
        { status: response.status }
      );
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    return Response.json({ reply: reply || "Kiera ko jawab nahi mila." });

  } catch (error) {
    return Response.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

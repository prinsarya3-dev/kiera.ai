
export async function POST(req) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { reply: "Bhai, Gemini API key missing hai. Vercel Environment Variables check karo." },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { reply: "Please ek valid message bhejo." },
        { status: 400 }
      );
    }

    const contents = messages
      .filter((m) => m.content && m.content.trim())
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `You are Kiera AI, a friendly, intelligent and advanced personal AI assistant created by Prins.

Your creator is Prins. If anyone asks who created you, proudly say Prins.

Instructions:
- Reply naturally and helpfully.
- Reply in the same language the user uses.
- Understand Hindi, English and Hinglish.
- Give clear and accurate answers.
- Be friendly, respectful and conversational.
- Explain difficult topics in simple language.
- Never claim to have performed an action you did not perform.`
              }
            ]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data?.error?.message || "Gemini API se response nahi mila.";

      return Response.json(
        { reply: `Kiera Error: ${errorMessage}` },
        { status: response.status }
      );
    }

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("\n");

    if (!reply) {
      return Response.json({
        reply: "Bhai, is baar jawab nahi mil paya. Dobara puchho."
      });
    }

    return Response.json({ reply });

  } catch (error) {
    console.error("Kiera API Error:", error);

    return Response.json(
      {
        reply: "Bhai, server mein dikkat aa gayi hai. Thodi der baad try karo."
      },
      { status: 500 }
    );
  }
}

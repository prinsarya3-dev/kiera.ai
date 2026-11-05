
"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.reply || data.error || "Kiera ko jawab nahi mila." },
      ]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Bhai, connection mein problem aa gayi." },
      ]);
    }

    setLoading(false);
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#100b20",
      color: "white",
      padding: "20px",
      fontFamily: "Arial"
    }}>
      <h1 style={{ color: "#c084fc" }}>✨ Kiera AI</h1>
      <p>Created with ❤️ by Prins</p>

      <div style={{ marginTop: "25px", marginBottom: "20px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            padding: "12px",
            margin: "10px 0",
            borderRadius: "12px",
            background: m.role === "user" ? "#372451" : "#211832"
          }}>
            <b>{m.role === "user" ? "You" : "Kiera"}:</b>
            <p style={{ whiteSpace: "pre-wrap" }}>{m.content}</p>
          </div>
        ))}
        {loading && <p style={{ color: "#c084fc" }}>Kiera soch rahi hai... 💭</p>}
      </div>

      <div style={{
        display: "flex",
        gap: "8px",
        position: "sticky",
        bottom: "10px"
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Kiera se kuch bhi pucho..."
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #7546a8",
            background: "#211832",
            color: "white",
            minWidth: 0
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "14px",
            borderRadius: "12px",
            background: "#9333ea",
            color: "white",
            border: "none"
          }}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </main>
  );
}


"use client";

import { useState } from "react";

export default function Kiera() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello Prins! ❤️ I'm Kiera. Tumhari personal AI assistant. Batao, aaj main tumhari kya help karun?"
    }
  ]);

  function sendMessage() {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      { role: "user", content: message }
    ]);

    setMessage("");
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#090914",
      color: "white",
      fontFamily: "Arial",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <header style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderBottom: "1px solid #27273b",
        paddingBottom: "20px"
      }}>
        <div style={{
          background: "linear-gradient(135deg,#a855f7,#6366f1)",
          borderRadius: "50%",
          width: "42px",
          height: "42px",
          display: "grid",
          placeItems: "center",
          fontSize: "22px"
        }}>✦</div>
        <div>
          <h2 style={{margin: 0}}>Kiera AI</h2>
          <small style={{color: "#a5a5c5"}}>Created by Prins · Your AI companion</small>
        </div>
      </header>

      <section style={{
        maxWidth: "800px",
        margin: "50px auto"
      }}>
        <div style={{textAlign: "center", marginBottom: "35px"}}>
          <div style={{
            fontSize: "60px",
            color: "#c084fc",
            textShadow: "0 0 35px #8b5cf6"
          }}>✧</div>
          <h1 style={{fontSize: "32px"}}>Hello, Prins.</h1>
          <p style={{color: "#aaaac4"}}>
            I'm Kiera. Your world, your AI.
          </p>
        </div>

        <div style={{
          minHeight: "250px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#493477" : "#171727",
              padding: "15px 18px",
              borderRadius: "18px",
              maxWidth: "85%",
              lineHeight: "1.6"
            }}>
              {m.content}
            </div>
          ))}
        </div>

        <div style={{
          display: "flex",
          gap: "10px",
          background: "#171727",
          border: "1px solid #34344c",
          borderRadius: "18px",
          padding: "10px",
          marginTop: "25px"
        }}>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Message Kiera..."
            style={{
              flex: 1,
              minWidth: 0,
              background: "transparent",
              color: "white",
              border: "none",
              outline: "none",
              fontSize: "16px",
              padding: "10px"
            }}
          />
          <button onClick={sendMessage} style={{
            background: "linear-gradient(135deg,#9333ea,#6366f1)",
            border: "none",
            color: "white",
            borderRadius: "12px",
            padding: "12px 20px",
            fontSize: "18px"
          }}>➤</button>
        </div>

        <p style={{
          textAlign: "center",
          color: "#66667d",
          fontSize: "12px",
          marginTop: "20px"
        }}>
          Kiera AI · Made with ♥ by Prins
        </p>
      </section>
    </main>
  );
                        }

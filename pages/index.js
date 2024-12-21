import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io();

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send-message", message);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Real-Time Chat</h1>
      <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", height: "200px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: "10px", border: "1px solid #ddd" }}
          placeholder="Type your message..."
        />
        <button type="submit" style={{ padding: "10px 20px", background: "#0070f3", color: "white", border: "none" }}>
          Send
        </button>
      </form>
    </div>
  );
}

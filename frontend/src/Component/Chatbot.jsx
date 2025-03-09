import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_KEY = "AIzaSyAaHFwHKxT2R4YLqYdrsGMMU6UZ5ZeSWaA"; 

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null); // For auto-scrolling

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are an AI assistant specialized in learning disabilities. 
                  Your job is to assist with queries related to learning disabilities, including dyslexia, ADHD, autism, and other neurodivergent learning challenges. 
                  If the question is not related to learning disabilities, respond with: 
                  "Sorry, I can only answer questions related to learning disabilities."

                  User's question: "${input}"`
                }
              ]
            }
          ]
        }
      );

      const aiReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand the request.";

      setMessages([...newMessages, { text: aiReply, sender: "bot" }]);
    } catch (error) {
      console.error("❌ Error fetching AI response:", error);
      setMessages([
        ...newMessages,
        { text: "Error: Unable to get a response", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>AI Learning Disability Assistant</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
              color: msg.sender === "user" ? "white" : "black",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div style={styles.loading}>Thinking...</div>}
        <div ref={chatEndRef} /> {/* Invisible div for auto-scrolling */}
      </div>
      <div style={styles.inputBox}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about learning disabilities..."
          style={styles.input}
        />
        <button
          onClick={sendMessage}
          style={styles.sendButton}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}




const styles = {
  container: { padding: "20px", maxWidth: "400px", margin: "auto" },
  title: { textAlign: "center" },
  chatBox: { border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto", display: "flex", flexDirection: "column" },
  message: { padding: "10px", borderRadius: "5px", margin: "5px", maxWidth: "80%" },
  loading: { textAlign: "center", marginTop: "10px", fontStyle: "italic" },
  inputBox: { display: "flex", marginTop: "10px" },
  input: { flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "5px" },
  sendButton: { marginLeft: "10px", padding: "10px", border: "none", background: "#007bff", color: "white", borderRadius: "5px", cursor: "pointer" }
};

export default Chatbot;


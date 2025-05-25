import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://myzolve-api.onrender.com/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.reply || "No response received.");
    } catch (error) {
      setResponse("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="gradientBg">
      <div className="container">
        <img src="/logo.png" alt="MyZolve Logo" className="logo" />

        <form onSubmit={handleSubmit} className="form">
          <textarea
            placeholder="What’s going on at work?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <button type="submit">
            {loading ? "Thinking..." : "Get Advice"}
          </button>
        </form>

        {response && (
          <div className="responseBox">
            <strong>Advice:</strong>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

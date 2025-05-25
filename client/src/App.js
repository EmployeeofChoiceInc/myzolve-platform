import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://myzolve-platform.onrender.com/api/ai/ask", {
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
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>MyZolve AI Advice</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          style={{ width: "100%", padding: "1rem" }}
          placeholder="Describe your workplace situation or question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" style={{ marginTop: "1rem", padding: "0.75rem 2rem" }}>
          {loading ? "Thinking..." : "Get Advice"}
        </button>
      </form>
      {response && (
        <div style={{ marginTop: "2rem", background: "#f1f1f1", padding: "1rem" }}>
          <strong>Advice:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;


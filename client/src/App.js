import React, { useState } from "react";
import "./App.css"; // Optional: if you want to extract styles later

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
    <div style={styles.container}>
      <img
        src="/logo192.png" // Optional: replace with your actual logo path
        alt="MyZolve Logo"
        style={styles.logo}
      />
      <h1 style={styles.title}>MyZolve</h1>
      <p style={styles.tagline}>HR’s Alter Ego</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          style={styles.textarea}
          placeholder="What’s going on at work?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>
          {loading ? "Thinking..." : "Get Advice"}
        </button>
      </form>

      {response && (
        <div style={styles.responseBox}>
          <strong>Advice:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

// 🎨 Custom Light Theme with MyZolve Branding
const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#fdfcfd",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#333",
  },
  logo: {
    height: "80px",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "2.5rem",
    margin: 0,
    color: "#663399", // Deep purple from your logo
  },
  tagline: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    color: "#339989", // Teal from logo
    fontStyle: "italic",
  },
  form: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    padding: "1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "120px",
    marginBottom: "1rem",
    resize: "vertical",
  },
  button: {
    backgroundColor: "#663399",
    color: "#fff",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  responseBox: {
    marginTop: "2rem",
    background: "#f1f1f1",
    padding: "1rem",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "600px",
  },
};

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import { auth, signIn, db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCredits(userSnap.data().credits);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signIn();
      setUser(result.user);

      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, { credits: 3 });
        setCredits(3);
      } else {
        setCredits(userSnap.data().credits);
      }
    } catch (error) {
      alert("Sign-in failed. Please try again.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    if (!user) {
      alert("Please sign in to continue.");
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists() || userSnap.data().credits <= 0) {
      alert("You’re out of credits. Please buy more to continue.");
      setLoading(false);
      return;
    }

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

      const newCredits = userSnap.data().credits - 1;
      await updateDoc(userRef, { credits: newCredits });
      setCredits(newCredits);
    } catch (error) {
      setResponse("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleBuyCredits = async () => {
    try {
      const res = await fetch("https://myzolve-api.onrender.com/api/checkout/create-checkout-session", {
        method: "POST",
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      alert("Unable to redirect to Stripe checkout.");
    }
  };

  return (
    <div className="gradientBg">
      <div className="container">
        <img src="/logo.png" alt="MyZolve Logo" className="logo" />

        {!user ? (
          <>
            <button onClick={handleSignIn} className="signin-btn">
              Sign in with Google
            </button>
            <p className="not-signed-in-msg">You must sign in to access AI advice.</p>
          </>
        ) : (
          <>
            <p className="credit-msg">
              You have <strong>{credits}</strong> credit{credits !== 1 && "s"} left.
            </p>

            <form onSubmit={handleSubmit} className="form">
              <textarea
                placeholder="What’s going on at work?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                disabled={credits <= 0}
              />
              <button type="submit" disabled={credits <= 0 || loading}>
                {loading ? "Thinking..." : "Get Advice"}
              </button>
            </form>

            {credits === 0 && (
              <p className="buy-more">
                You’re out of credits. {" "}
                <button onClick={handleBuyCredits}>Buy more credits</button>
              </p>
            )}

            {response && (
              <div className="responseBox">
                <strong>Advice:</strong>
                <p>{response}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;


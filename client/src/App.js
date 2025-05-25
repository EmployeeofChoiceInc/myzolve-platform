import React, { useState, useEffect } from "react";
import { auth, signIn } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      console.log("Auth state changed:", firebaseUser);
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signIn();
      setUser(result.user);
      console.log("Signed in:", result.user);
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>MyZolve Login Test</h1>
      <p style={{ color: "red" }}>
        Debug: {user ? `Signed in as ${user.email}` : "No user detected"}
      </p>
      {!user && (
        <button onClick={handleSignIn} style={{ padding: "1rem", fontSize: "1rem" }}>
          Sign in with Google
        </button>
      )}
    </div>
  );
}

export default App;
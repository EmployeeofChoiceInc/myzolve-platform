// client/src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace the below with your real config from Firebase Console
const firebaseConfig = {
 apiKey: "AIzaSyAJW8qeiipn8QQvnD7FGBbQyCDLRc38qrs",
  authDomain: "myzolve-16aaf.firebaseapp.com",
  projectId: "myzolve-16aaf",
  storageBucket: "myzolve-16aaf.firebasestorage.app",
  messagingSenderId: "189416685486",
  appId: "1:189416685486:web:360a36411873171acb923f",
  measurementId: "G-FFP1E2Q71M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const signIn = () => signInWithPopup(auth, provider);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
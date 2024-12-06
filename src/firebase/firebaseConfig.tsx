// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhdIsDPk6iK0E7I94UeSSTCtmxuF9RP1A",
  authDomain: "narak-9a858.firebaseapp.com",
  projectId: "narak-9a858",
  storageBucket: "narak-9a858.firebasestorage.app",
  messagingSenderId: "550574649070",
  appId: "1:550574649070:web:336b476e117f9411ce4dff",
  measurementId: "G-5LCVEM773R",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Auth 테스트
export const auth = getAuth(app);

// setPersistence(auth, browserLocalPersistence)
//   .then(() => {
//     console.log("Firebase Auth Persistence set to localStorage.");
//   })
//   .catch((error) => {
//     console.error("Failed to set persistence for Firebase Auth:", error);
//   });

console.log("Firebase Initialized:", app);
console.log("Auth Service:", auth);

export default app;

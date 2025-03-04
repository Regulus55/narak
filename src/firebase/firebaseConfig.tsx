// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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

// console.log("Firebase Initialized:", app);
// console.log("Auth Service:", auth);

export default app;

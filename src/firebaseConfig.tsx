// src/firebaseConfig.js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhdIsDPk6iK0E7I94UeSSTCtmxuF9RP1A",
  authDomain: "narak-9a858.firebaseapp.com",
  projectId: "narak-9a858",
  storageBucket: "narak-9a858.firebasestorage.app",
  messagingSenderId: "550574649070",
  appId: "1:550574649070:web:336b476e117f9411ce4dff",
  measurementId: "G-5LCVEM773R",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export the Firebase services you need
export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage();

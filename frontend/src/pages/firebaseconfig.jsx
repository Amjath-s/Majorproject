import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";

// Firebase configuration from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDXfsggaEfwPbnHTZ_JNee1B5ZH6-gTlZU",
  authDomain: "final-project-85211.firebaseapp.com",
  projectId: "final-project-85211",
  storageBucket: "final-project-85211.firebasestorage.app",
  messagingSenderId: "758889969967",
  appId: "1:758889969967:web:d205978ba93d59b6fe49da",
  measurementId: "G-C1EVWZL8JR",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, addDoc, collection, signInWithEmailAndPassword ,createUserWithEmailAndPassword};





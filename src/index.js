import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6kK5PVz-NH7rxcCxvXRgNdkktxLkDZ7U",
  authDomain: "ai-learning-1d7e2.firebaseapp.com",
  projectId: "ai-learning-1d7e2",
  storageBucket: "ai-learning-1d7e2.appspot.com",
  messagingSenderId: "459951159493",
  appId: "1:459951159493:web:977920a8de4039f40e58ac",
  measurementId: "G-D05LSCG2K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadObjects() {
  const objectsRef = db.collection('objects');
  const snapshot = await objectsRef.get();
  const objects = snapshot.docs.map(doc => doc.data());
  displayRandomObjects(objects);
}

function displayRandomObjects(objects) {
  const randomIndices = [Math.floor(Math.random() * objects.length), Math.floor(Math.random() * objects.length)];
  document.getElementById('object1').src = objects[randomIndices[0]].imageURL;
  document.getElementById('object2').src = objects[randomIndices[1]].imageURL;
}

function checkAnswer(selectedObject) {
  // Placeholder logic for checking the answer
  // Compare selectedObject with the correct answer
  const correctObject = "YOUR_CORRECT_OBJECT"; // You will need to implement logic to determine this.
  const resultElement = document.getElementById('result');
  if (selectedObject === correctObject) {
      resultElement.textContent = "Correct!";
  } else {
      resultElement.textContent = "Incorrect. Try again!";
  }
}

loadObjects();

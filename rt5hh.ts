<html>
<body>
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA6kK5PVz-NH7rxcCxvXRgNdkktxLkDZ7U",
    authDomain: "ai-learning-1d7e2.firebaseapp.com",
    projectId: "ai-learning-1d7e2",
    storageBucket: "ai-learning-1d7e2.firebasestorage.app",
    messagingSenderId: "459951159493",
    appId: "1:459951159493:web:977920a8de4039f40e58ac",
    measurementId: "G-D05LSCG2K4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
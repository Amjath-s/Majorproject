// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseconfig.jsx";

function ProtectedRoute({ children }) {
  const [user] = useAuthState(auth);

  // If user is authenticated, render the child component; otherwise, redirect to login
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;

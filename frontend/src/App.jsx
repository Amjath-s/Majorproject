import { Route, Router,Routes } from "react-router-dom"

import './Style/navbar.css'
import './app.css'
import Home from  '../src/pages/Home'
// import About from "./pages/About"
// import Call from '../src/pages/Call'
//  
import Login from "./pages/Login"
import Dashboard  from "./pages/Dashboard"
import ProtectedRoute from "./pages/ProtectRoute"
import  Signup from './pages/Signup'
// import Layout from "./Component/Layout"




function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App

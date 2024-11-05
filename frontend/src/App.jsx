import { Router } from "react-router-dom"
import NavBar from "./Component/NavBar"
import './Style/navbar.css'
import './app.css'
import Home from  '../src/pages/Home'
import About from "./pages/About"
import Call from '../src/pages/Call'




function App() {
  
  return (
    <>
      <NavBar />
      <Home/>
      <About/>
      <Call/>
    
     
     
    </>
  );
}

export default App

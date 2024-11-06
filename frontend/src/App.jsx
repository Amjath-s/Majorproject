import { Route, Router,Routes } from "react-router-dom"
import NavBar from "./Component/NavBar"
import './Style/navbar.css'
import './app.css'
import Home from  '../src/pages/Home'
import About from "./pages/About"
import Call from '../src/pages/Call'
import Footer from "./pages/Footer"
import Login from "./pages/Login"
// import Layout from "./Component/Layout"




function App() {
  
  return (
    <>
    
        {/* <NavBar />
        <Home/>
        <About/>
        <Call/>
        <Footer/>  */}

        {/* <Routes> 

          <Route path='/login' element={<Login/>}/>
         
        </Routes> */}
         <NavBar/>
         {/* <Home/> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<>
          <Call/>
          <Footer/>
          </>} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
       
      

     
    </>
  );
}

export default App

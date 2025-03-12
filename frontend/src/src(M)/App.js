import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import PersonalDetails from "./PersonalDetails"; // assuming you've created this component
import HealthDetails from "./HealthDetails"; // the new page component
import Test1 from "./Test1";
import ColourTest from "./ColourTest";
import NumberTest from "./NumberTest";
import Numbercomp from "./Numbercomp"; // Import the new game

function App() {
  return (
    <Router>
      <div className="background">
        <nav style={{ position: "absolute", top: "20px", left: "20px" }}>
          <Link to="/">Personal Details</Link> | <Link to="/health">Health Details</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PersonalDetails />} />
          <Route path="/health" element={<HealthDetails />} />
          <Route path="/test1" element={<Test1 />} />
          <Route path="/game/colour" element={<ColourTest />} />
          <Route path="/game/number" element={<NumberTest />} />
          <Route path="/game/number-comparison" element={<Numbercomp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


import "../style/StressChecker.css";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
function StressChecker()
{
  const navigate = useNavigate();
  const handleStressCheck = () => {
    navigate("/dashboard/StressCheck");


  };
  return (
    <>
      <div className="container">
        <div className="stresschecker">
          <h1>Stress Checker</h1>
          <div className="stresschecker__webcam">
            NEED TO CHECK YOUR CHILD'S STRESS LEVEL? USE OUR STRESS CHECKER
          </div>
          <div className="stresschecker__button">
            <button onClick={handleStressCheck}>
            Check Stress</button>
          </div>
        </div>

      </div>
    </>
  );










};

export default StressChecker;

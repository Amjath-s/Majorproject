import React from "react";
import { useNavigate } from "react-router-dom";

function HealthDetails() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/test1");
  };

  const containerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "45px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "400px",
    margin: "auto",
    textAlign: "left",
  };

  const inputStyle = {
    width: "100%",
    padding: "20px",
    marginTop: "5px",
    marginBottom: "15px",
    marginLeft: "-20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Health Details
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Has your child been diagnosed with any specific medical or learning
          conditions? If so, what are they?:
          <input
            type="text"
            name="medicalConditions"
            placeholder="e.g., Asthma, Allergies"
            style={inputStyle}
          />
        </label>
        <label>
          Does your child have any known allergies (food, medications,
          environmental):
          <input
            type="text"
            name="allergies"
            placeholder="e.g., gluten-free, dairy, penicillin"
            style={inputStyle}
          />
        </label>
        <label>
          Are there any medications your child takes regularly? If yes, please
          specify:
          <input type="text" name="medications" style={inputStyle} />
        </label>
        <label>
          Has your child had any significant health issues, hospitalizations, or
          surgeries? If yes, please describe:
          <input type="text" name="healthissues" style={inputStyle} />
        </label>
        <button
          type="submit"
          style={{ ...buttonStyle, ":hover": buttonHoverStyle }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default HealthDetails;

import React from "react";

function PersonalDetails() {
  const containerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "30px",
    borderRadius: "50px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
    marginTop: "50px",
    marginBottom: "50px",
    textAlign: "left",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "15px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "10px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
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
      <h2 style={headingStyle}>Personal Details</h2>
      <form>
        <label style={labelStyle}>
          Name:
          <input type="text" name="name" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Date of Birth:
          <input type="date" name="dob" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Age:
          <input type="number" name="age" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Email:
          <input type="email" name="email" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Phone:
          <input type="tel" name="phone" style={inputStyle} />
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

export default PersonalDetails;

import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "300px",
        margin: "0 auto",
        display: "block",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <h2>Login</h2>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;

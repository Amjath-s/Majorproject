import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { div } from "framer-motion/client";
import TextField from "@mui/material/TextField";
import img2 from "../assets/green-desk.jpg";
import Button from "@mui/material/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signup = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5005/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token); // Save token
      alert("Login successful!");
      navigate("/dashboard"); // ✅ Redirect after login
      console.log(email);
    } catch (err) {
      console.error("Login Error:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 auto",
          margin: "0 auto",
          // justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "aliceblue",
          backdropFilter: "revert-layer",
          backgroundImage: `url(${img2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{marginBottom:"120px",padding:"0p",display:"flex",alignItems:"center",backgroundColor:"rgba(250,150,120,0.5)",height:"40px",width:"100%",fontFamily:"revert-layer"}}>ADAPTILEARN</div>
        <div
          style={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "60%",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "400px",
            boxShadow: "2px 3px 3px 4px",
          }}
        >
          <h1>LOGIN</h1>
          <div>
            <form
              onSubmit={handleLogin}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                required
                id="outlined-required1"
                label="EMAIL"
                defaultValue="Hello World"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: "10px" }}
                fullWidth
              />
              <TextField
                required
                id="outlined-required2"
                label="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                fullWidth
              />
              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: "10px" }}
                sx={{
                  backgroundColor: "#6C9BCF", // Default background color
                  color: "white", // Default text color
                  "&:hover": {
                    backgroundColor: "#4A7BB5", // Background color on hover
                    color: "#FFFFFF", // Text color on hover
                    boxShadow: "0px 4px 8px rgba(42, 37, 37, 0.76)", // Optional: Add shadow on hover
                  },
                }}
              >
                LOGIN
              </Button>

              <br />
              <button onClick={signup} style={{ backgroundColor: "white" }}>
                new user?
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

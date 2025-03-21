import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    // const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5005/signup", {
        name,
        email,
        password,
      });

      alert(res.data.msg);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <>
      <div
        style={{
            backgroundColor: "white",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            display:"flex",
            flexDirection:"column"
     
        }}
      >
        <div
          style={{
            backgroundColor: "aliceblue",
            height: "600px",
            width:"500px",
            justifyContent: "center",
          }}
        >
          <div style={{ flexDirection:"column"}}>
            
          
            <h2 style={{ textAlign: "center", marginTop: "15px" }}>Signup</h2>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Signup</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

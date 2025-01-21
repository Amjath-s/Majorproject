import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5005/api/auth/signup", {
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
    <div>
      <h2>Signup</h2>
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
  );
};

export default Signup;

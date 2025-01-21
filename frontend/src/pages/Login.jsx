

// // export default LoginForm;
// import "../Style/form.css";



// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // To handle errors
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     console.log("hlkk");
//     try {
//       const res = await axios.post("http://localhost:5005/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);
    
//       alert(res.data.msg);
//       navigate("/dashboard"); // Redirect to dashboard after successful login
//     } catch (error) {
//       setError("Invalid login credentials");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p>{error}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button
//         onClick={() => {
//           console.log("Button Clicked");
//           handleLogin();
//         }}
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    } catch (err) {
      console.error("Login Error:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

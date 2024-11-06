import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/loginbutton.css";

function LoginButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return <button onClick={handleClick}>Login</button>;
}

export default LoginButton;

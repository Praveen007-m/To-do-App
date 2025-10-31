import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import '/src/Css/Auth.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await api.get("/sanctum/csrf-cookie");

      const res = await api.post("/login", {
        email,
        password,
      }, {
        headers: {
          "Accept": "application/json",
        }
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token); // if returning token
      alert("Login Successful");
      navigate("/home");

    } catch (error) {
      console.error("Login Error:", error.response?.data || error);
      alert("Invalid Credentials");
    }
  };


  return (
    <div className="Authmain-container">
      <div className="auth-container">
        <h2>Login</h2>
        <input type="email" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>

        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

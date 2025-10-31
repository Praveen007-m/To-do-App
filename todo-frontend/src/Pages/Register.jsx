import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import '/src/Css/Auth.css'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.get("/sanctum/csrf-cookie");

      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: password
      });


      console.log(res.data);
      alert("Registered Successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration Failed ");
    }
  };

  return (
    <div className="Authmain-container">
      <div className="auth-container">
        <h2>Register</h2>

        <input type="text" placeholder="Full Name"
          onChange={(e) => setName(e.target.value)} />

        <input type="email" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleRegister}>Sign Up</button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

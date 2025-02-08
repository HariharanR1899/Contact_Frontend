"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const BASE_URL = "https://contact-backend-9oih.onrender.com";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, formData);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/"; 
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
}
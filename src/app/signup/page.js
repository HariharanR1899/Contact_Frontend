"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const BASE_URL = "https://contact-backend-9oih.onrender.com";

export default function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/register`, formData);
      alert("Signup successful! You can now login.");
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. User may already exist.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
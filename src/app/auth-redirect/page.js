"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userid = urlParams.get("userid");
    const redirectPage = localStorage.getItem("redirect") || "/contacts";

    if (token && userid) {
      localStorage.setItem("token", token);
      localStorage.setItem("userid", userid);
      localStorage.removeItem("redirect"); // ✅ Clear redirect after login
      router.replace(redirectPage); // ✅ Redirect to intended page
    } else {
      router.replace("/login");
    }
  }, []);

  return <p>Redirecting...</p>; // ✅ Temporary loading message
}
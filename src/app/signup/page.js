
"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "../auth.module.css"; // ✅ Import CSS

const BASE_URL = "https://contact-backend-9oih.onrender.com";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpMessage, setOtpMessage] = useState(""); // ✅ Store OTP Sent Message
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Store Error Messages


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("error") === "AccountExists") {
      setErrorMessage("Account already exists. Please log in.");
    }
    if (urlParams.get("signupSuccess") === "true") {
      setOtpMessage("Signup successful! Please log in.");
    }
  },[router.asPath]);
  // ✅ Handle OTP Send
  const handleSendOTP = async () => {
    try {
      setErrorMessage(""); // Clear previous errors
      await axios.post(`${BASE_URL}/send-otp`, { email });
      setOtpSent(true);
      setOtpMessage("OTP sent to your email. Check your inbox or spam folder."); // ✅ Show Message
    } catch (error) {
      setErrorMessage("Error sending OTP. Try again."); // ✅ Show error below button
    }
  };

  // ✅ Handle Signup with OTP Verification
  const handleSignup = async () => {
    try {
      await axios.post(`${BASE_URL}/verify-otp`, { email, otp, password });
      localStorage.removeItem("resetSuccess");
      // ✅ Store success message in localStorage
      localStorage.setItem("signupSuccess", "Signup successful! Please log in.");
      
      router.replace("/"); // Redirect to login page
    } catch (error) {
      setErrorMessage("OTP verification failed. Please check and try again.");
    }
  };

  return (
    <div className={styles.authContainer}>
            <div className={styles.contactBookIcon}>
      <i className="fas fa-address-book"></i>
    </div>
      <h2 className={styles.authTitle}>Sign up for Contacts</h2>

      {/* ✅ Hide Google Sign-in After OTP Sent */}
      {!otpSent && (
        <> 
        <div className={styles.googleLogin}>
          <a href={`${BASE_URL}/auth/google/signup`} className={styles.googleBtn}>
            <i className="fa-brands fa-google"></i> Sign up with Google
          </a>
        </div>
        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        <div className={styles.divider}>
        <span>OR</span>
      </div>
        </>
      )}

     

      {/* ✅ Show OTP Sent Message */}
      {otpSent && <p className={styles.otpMessage}>{otpMessage}</p>}

      {/* ✅ Show Either Email Input or OTP Fields */}
      {!otpSent ? (
        <div className={styles.authForm}>
          <input
            type="email"
            className={styles.authInput}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className={styles.authButton} onClick={handleSendOTP}>
            Send OTP
          </button>

          {/* ✅ Show error message below button */}
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        </div>
      ) : (
        <div className={styles.authForm}>
          <input
            type="text"
            className={styles.authInput}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            className={styles.authInput}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={styles.authButton} onClick={handleSignup}>
            Verify OTP & Signup
          </button>

          {/* ✅ Show Back Button below the Verify button */}
          <button
            className={styles.backButton}
            onClick={() => {
              setOtpSent(false);
              setOtpMessage("");
            }}
          >
            Back
          </button>

          {/* ✅ Show error message below Verify button */}
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        </div>
      )}

      {/* ✅ Sign-in Link */}
      <p className={styles.authText}>
        Already have an account? <a className={styles.authLink} href="/">Login</a>
      </p>
    </div>
  );
}
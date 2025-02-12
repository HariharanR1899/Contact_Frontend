

// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// const BASE_URL = "https://contact-backend-9oih.onrender.com"; // ✅ Updated API base URL

// export default function Home() {
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [formData, setFormData] = useState({ name: "", address: "", phone: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [darkMode, setDarkMode] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/contacts`);
//       const sortedContacts = response.data.sort((a, b) => a.name.localeCompare(b.name));
//       setContacts(sortedContacts);
//       setFilteredContacts(sortedContacts);
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = contacts.filter(
//       (contact) =>
//         contact.name.toLowerCase().includes(query) || contact.phone.includes(query)
//     );
//     setFilteredContacts(filtered);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setFilteredContacts(contacts);
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setFormData({ name: "", address: "", phone: "" });
//     setShowModal(false);
//   };

//   const handleEdit = (contact) => {
//     setEditingId(contact.id);
//     setFormData({ name: contact.name, address: contact.address, phone: contact.phone });
//     setShowModal(true);
//   };

//   const handleNewContact = () => {
//     resetForm();
//     setShowModal(true);
//   };

//   const handleCancel = () => {
//     resetForm();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       try {
//         await axios.put(`${BASE_URL}/contacts/${editingId}`, formData);
//         resetForm();
//       } catch (error) {
//         console.error("Error updating contact:", error);
//       }
//     } else {
//       try {
//         await axios.post(`${BASE_URL}/contacts`, formData);
//         resetForm();
//       } catch (error) {
//         console.error("Error adding contact:", error);
//       }
//     }
//     fetchContacts();
//   };

//   const confirmDelete = (contactId) => {
//     setDeleteId(contactId);
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     try {
//       await axios.delete(`${BASE_URL}/contacts/${deleteId}`);
//       setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== deleteId));
//       setFilteredContacts((prevFiltered) => prevFiltered.filter((contact) => contact.id !== deleteId));
//       setDeleteId(null);
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//     }
//   };

//   return (
//     <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
//       <div className="contacts-container">
//         <div className="contacts-header">
//           <h2><div className="contact-book-icon">
//         <i className="fas fa-address-book"></i>
//       </div> Contacts</h2>     
//           <div className="button-container">
//             <button className="primary-btn" onClick={handleNewContact}>+ New</button>
//             <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
//               {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
//             </button>
//           </div>
//         </div>

//         <div className="search-container">
//           <i className="fas fa-search search-icon"></i>
//           <input
//             type="text"
//             className="search-bar"
//             placeholder="Search by Name or Phone..."
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           {searchQuery && <i className="fas fa-times clear-icon" onClick={clearSearch}></i>}
//         </div>

//         <div className="contacts-list">
//           {filteredContacts.length === 0 ? (
//             <div className="no-contacts">
//               {contacts.length === 0 ? "No Contacts" : "Contact Not Found"}
//             </div>
//           ) : (
//             filteredContacts.map((contact) => (
//               <div
//                 key={contact.id}
//                 className={`contact-item ${expandedId === contact.id ? "expanded" : ""}`}
//                 onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
//               >
//                 <div className="contact-header">
//                   <div className="contact-name">{contact.name}</div>
//                   <div className="contact-icons">
//                     <i className="fas fa-edit edit-icon" onClick={(e) => { e.stopPropagation(); handleEdit(contact); }}></i>
//                     <i className="fas fa-trash delete-icon" onClick={(e) => { e.stopPropagation(); confirmDelete(contact.id); }}></i>
//                   </div>
//                 </div>

//                 {expandedId === contact.id && (
//                   <div className="contact-details">
//                     <p><strong>Address:</strong> {contact.address}</p>
//                     <p><strong>Phone:</strong> {contact.phone}</p>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {showModal && (
//         <div className="modal">
//           <h2>{editingId ? "Edit Contact" : "New Contact"}</h2>
//           <form onSubmit={handleSubmit}>
//             <input type="text" name="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
//             <input type="text" name="address" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
//             <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />

//             <div className="form-buttons">
//               <button type="submit" className="save-btn">Save</button>
//               <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
//             </div>
//           </form>
//         </div>
//       )}

//       {deleteId && (
//         <div className="modal">
//           <p>Are you sure you want to delete this contact?</p>
//           <div className="modal-buttons">
//             <button className="delete-btn" onClick={handleDelete}>Yes, Delete</button>
//             <button className="cancel-btn" onClick={() => setDeleteId(null)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const BASE_URL = "https://contact-backend-9oih.onrender.com";

// export default function Home() {
//   const router = useRouter();
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [formData, setFormData] = useState({ name: "", address: "", phone: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [darkMode, setDarkMode] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [token, setToken] = useState(null);

//   // ✅ Check if user is logged in
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUserId = localStorage.getItem("userid");

//     if (!storedToken || !storedUserId) {
//       router.push("/login"); // Redirect to login if not authenticated
//       return;
//     }

//     setToken(storedToken);
//     setUserId(storedUserId);
//     fetchContacts(storedToken);
//   }, []);

//   // ✅ Fetch Contacts (Authenticated)
//   const fetchContacts = async (authToken) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/contacts`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });

//       const sortedContacts = response.data.sort((a, b) => a.name.localeCompare(b.name));
//       setContacts(sortedContacts);
//       setFilteredContacts(sortedContacts);
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//       router.push("/login"); // Redirect if unauthorized
//     }
//   };

//   // ✅ Handle Search
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = contacts.filter(
//       (contact) =>
//         contact.name.toLowerCase().includes(query) || contact.phone.includes(query)
//     );
//     setFilteredContacts(filtered);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setFilteredContacts(contacts);
//   };

//   // ✅ Reset Form
//   const resetForm = () => {
//     setEditingId(null);
//     setFormData({ name: "", address: "", phone: "" });
//     setShowModal(false);
//   };

//   // ✅ Edit Contact
//   const handleEdit = (contact) => {
//     setEditingId(contact.id);
//     setFormData({ name: contact.name, address: contact.address, phone: contact.phone });
//     setShowModal(true);
//   };

//   // ✅ Open Modal for New Contact
//   const handleNewContact = () => {
//     resetForm();
//     setShowModal(true);
//   };

//   // ✅ Cancel Action
//   const handleCancel = () => {
//     resetForm();
//   };

//   // ✅ Add or Update Contact
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       console.error("No token found. User not authenticated.");
//       return;
//     }

//     const config = {
//       headers: { Authorization: `Bearer ${token}` },
//     };

//     try {
//       if (editingId) {
//         // ✅ Update Contact
//         await axios.put(`${BASE_URL}/contacts/${editingId}`, formData, config);
//       } else {
//         // ✅ Create Contact
//         await axios.post(`${BASE_URL}/contacts`, formData, config);
//       }
//       resetForm();
//       fetchContacts(token);
//     } catch (error) {
//       console.error("Error saving contact:", error);
//     }
//   };

//   // ✅ Confirm Delete
//   const confirmDelete = (contactId) => {
//     setDeleteId(contactId);
//   };

//   // ✅ Handle Delete
//   const handleDelete = async () => {
//     if (!deleteId || !token) return;

//     try {
//       await axios.delete(`${BASE_URL}/contacts/${deleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== deleteId));
//       setFilteredContacts((prevFiltered) => prevFiltered.filter((contact) => contact.id !== deleteId));
//       setDeleteId(null);
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//     }
//   };

//   return (
//     <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
//       <div className="contacts-container">
//         <div className="contacts-header">
//           <h2>Contacts</h2>
//           <div className="button-container">
//             <button className="primary-btn" onClick={handleNewContact}>+ New</button>
//             <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
//               {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
//             </button>
//           </div>
//         </div>

//         <div className="search-container">
//           <input type="text" className="search-bar" placeholder="Search by Name or Phone..." value={searchQuery} onChange={handleSearch} />
//           {searchQuery && <button onClick={clearSearch}>Clear</button>}
//         </div>

//         <div className="contacts-list">
//           {filteredContacts.map((contact) => (
//             <div key={contact.id} className="contact-item">
//               <div className="contact-header">
//                 <div className="contact-name">{contact.name}</div>
//                 <button onClick={() => handleEdit(contact)}>Edit</button>
//                 <button onClick={() => confirmDelete(contact.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./auth.module.css"; // ✅ Import CSS

const BASE_URL = "https://contact-backend-9oih.onrender.com";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false); // ✅ This was missing
  const [otpSent, setOtpSent] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  const [resetSuccess, setResetSuccess] = useState("");
const [signupSuccess, setSignupSuccess] = useState("");
const [loginError, setLoginError] = useState("");
const [errorMessage, setErrorMessage] = useState("");
  // ✅ Handle Google Login Redirection
  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const userid = urlParams.get("userid");
  const error = urlParams.get("error");
  const redirectPage = localStorage.getItem("redirect") || "/contacts"; // ✅ Default to /contacts
  if (urlParams.get("success") === "SignedUp") {
    setSignupSuccess("Signup successful! Please log in.");
  }
  if (error === "NoAccount") {
    setErrorMessage("No account found. Please sign up first.");
  }
  if (urlParams.get("error") === "AlreadyExists") {
    setErrorMessage("Account already exists. Please log in.");
  }

  if (token && userid) {
    localStorage.setItem("token", token);
    localStorage.setItem("userid", userid);
   
  }
  if (urlParams.get("error") === "NoAccount") {
    setErrorMessage("No account found. Please sign up first.");
  }
  if (token && userid) {
    localStorage.setItem("token", token);
    localStorage.setItem("userid", userid);

    // Remove query parameters after storing the token
    localStorage.removeItem("redirect"); // ✅ Clear redirect after use
    router.replace(redirectPage); // ✅ Redirect to intended page
  } else {
    // If no token is found, redirect to login
    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      router.replace("/");
    }
  }
    // ✅ Get success messages from localStorage
    const resetSuccessMessage = localStorage.getItem("resetSuccess");
    const signupSuccessMessage = localStorage.getItem("signupSuccess");
  
    if (resetSuccessMessage) {
      setResetSuccess(resetSuccessMessage);
      setSignupSuccess(""); // ✅ Clear signup message if password was changed
      localStorage.removeItem("resetSuccess"); // ✅ Clear reset message after displaying
    } else if (signupSuccessMessage) {
      setSignupSuccess(signupSuccessMessage);
      setResetSuccess(""); // ✅ Clear reset message if signup just happened
      localStorage.removeItem("signupSuccess"); // ✅ Clear signup message after displaying
    }
  }, [router.asPath]); // ✅ Trigger effect every time the router changes

  // ✅ Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userid", response.data.userid);
      router.push("/contacts");
    } catch (error) {
      setLoginError(error.response?.data?.error || "Invalid password or email id ");
    }
  };

  // ✅ Handle Forgot Password (Send OTP)
  const handleForgotPassword = async () => {
    try {
      await axios.post(`${BASE_URL}/send-forgot-password-otp`, { email: forgotEmail });
      setOtpSent(true);
      setOtpMessage("OTP sent to your email. Check your inbox or spam folder."); // ✅ Show OTP message
    } catch (error) {
      setOtpMessage("Email not Registered."); // ✅ Show error message below input
    }
  };

  // ✅ Handle Reset Password (Verify OTP & Update Password)
  const handleResetPassword = async () => {
    try {
      await axios.post(`${BASE_URL}/reset-password`, { email: forgotEmail, otp, newPassword });
      localStorage.removeItem("signupSuccess");
      // ✅ Store success message in localStorage
      localStorage.setItem("resetSuccess", "Password changed successfully! Please log in.");
  
      setShowForgotPassword(false);
      setOtpSent(false); // Hide OTP fields
      setOtpMessage(""); // Clear OTP message
      setForgotEmail(""); // Reset email field
      setOtp(""); // Reset OTP field
      setNewPassword(""); // Reset new password field
      setResetSuccess("Password changed successfully! Please log in.");
      setSignupSuccess("");
      router.replace("/");
    } catch (error) {
      setOtpMessage("Invalid OTP or expired. Try again."); // ✅ Show error below input
    }
  };

  return (
    <div className={styles.authContainer}>
          <div className={styles.contactBookIcon}>
      <i className="fas fa-address-book"></i>
    </div>
      {showForgotPassword ? (
        // ✅ Forgot Password UI
        <div className={styles.authForm}>
            
          
          <h2 className={styles.authTitle}>Forgot Password</h2>

          {!otpSent ? (
            <>
              <input
                type="email"
                className={styles.authInput}
                placeholder="Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
              <button className={styles.authButton} onClick={handleForgotPassword}>
                Send OTP
              </button>

              {/* ✅ Show OTP Message */}
              {otpMessage && <p className={styles.otpMessage}>{otpMessage}</p>}

              {/* ✅ Back Button (Same UI as Verify OTP Page) */}
              <button
                className={styles.backButton}
                onClick={() => setShowForgotPassword(false)}
              >
                Back
              </button>
            </>
          ) : (
            <>
              <p className={styles.otpMessage}>{otpMessage}</p>
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button className={styles.authButton} onClick={handleResetPassword}>
                Reset Password
              </button>
              <button className={styles.backButton} onClick={() => setShowForgotPassword(false)}>
                Back
              </button>
            </>
          )}

          {resetSuccess && (
            <p className={styles.successMessage}>Password changed successfully! Log in now.</p>
          )}
        </div>
      ) : (
        // ✅ Default Login UI
        <>
          <h2 className={styles.authTitle}>Sign in to Contacts</h2>

         {/* ✅ Google Login */}
<div className={styles.googleLogin}>
  <a
    href={`${BASE_URL}/auth/google/login`}
    className={styles.googleBtn}
    onClick={() => localStorage.setItem("redirect", "contacts")} // ✅ Store intended route
  >
    <i className="fa-brands fa-google"></i> Sign in with Google
  </a>
</div>
{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
<div className={styles.divider}>
        <span>OR</span>
      </div>

          <div className={styles.authForm}>
            <input
              type="email"
              className={styles.authInput}
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              className={styles.authInput}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button className={styles.authButton} onClick={handleLogin}>
              Sign in with Email
            </button>
          </div>

          {/* ✅ Forgot Password Link */}
          <p
            className={styles.forgotPassword}
            onClick={() => {
              setShowForgotPassword(true);
              setOtpSent(false); // ✅ Reset OTP state
              setOtpMessage(""); // ✅ Clear OTP message
              setForgotEmail(""); // ✅ Clear input field
              setOtp(""); // ✅ Clear OTP field
              setNewPassword(""); // ✅ Clear password field
            }}
          >
            Forgot Password?
          </p>

          {/* ✅ Show login error message below the Sign In button */}
{loginError && <p className={styles.errorText}>{loginError}</p>}
{/* ✅ Show password reset success message in green */}
{resetSuccess && <p className={styles.successMessage}>{resetSuccess}</p>}

{/* ✅ Show signup success message in green */}
{!resetSuccess && signupSuccess && <p className={styles.successMessage}>{signupSuccess}</p>}

          <p className={styles.authText}>
            Don't have an account? <a className={styles.authLink} href="/signup">Sign up</a>
          </p>
        </>
      )}
    </div>
  );
}

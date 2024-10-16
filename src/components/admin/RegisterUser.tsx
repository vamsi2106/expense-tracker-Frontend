// src/components/admin/RegisterUser.tsx
import React, { useState } from "react";
import axios from "axios";
import { RootState } from "../../store"; // Importing RootState correctly
import { useSelector } from "react-redux";
import "./RegisterUser.css"; // Optional styling

const RegisterUser: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [message, setMessage] = useState("");

  // Move useSelector outside of handleSubmit
  const token = useSelector((state: RootState) => state.user.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/users/register", // Backend API URL
        { username, email, role }, // Payload with username, email, and role
        { headers: { Authorization: `Bearer ${token}` } } // Send token in header for admin access
      );
      setMessage("User registered and invitation sent successfully.");
    } catch (error) {
      console.error("Error registering user", error);
      setMessage("Failed to register user or send invitation.");
    }
  };

  return (
    <div>
      <h2>Register New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>{" "}
            {/* If you want admin registration too */}
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterUser;

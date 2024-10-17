import React, { useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import "./RegisterUser.css"; // Custom CSS

const RegisterUser: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [userImageUrl, setuserImageUrl] = useState(""); // Updated from profileImage
  const [isUploading, setIsUploading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false); // Track image upload status

  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = useSelector((state: RootState) => state.user.token);

  // Handle Image Upload with Toast notifications
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "user-images"); // Replace with your upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtyiomktp/image/upload", // Replace with your Cloudinary URL
        formData
      );
      setuserImageUrl(response.data.secure_url);
      setIsImageUploaded(true); // Set image upload status to true
      toast.success(`Image uploaded successfully! ${response.data.secure_url}`); // Show success toast
    } catch (error) {
      console.error("Error uploading image", error);
      setIsImageUploaded(false); // Set image upload status to false
      toast.error("Failed to upload image."); // Show error toast
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(typeof userImageUrl);
    try {
      await axios.post(
        "http://localhost:5000/users/register",
        { username, email, role, userImageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User registered and invitation sent successfully.");
      setUsername("");
      setEmail("");
      setRole("user");
      setuserImageUrl("");
      setIsImageUploaded(false); // Reset upload status after successful registration
    } catch (error) {
      console.error("Error registering user", error);
      toast.error("Failed to register user or send invitation.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="title">Register New User</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="image-upload-container">
          <div className="profile-picture">
            {userImageUrl ? (
              <img src={userImageUrl} alt="Profile" className="profile-img" />
            ) : (
              <div className="placeholder-icon">
                <FaUser className="icon" />
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="upload-btn"
            >
              <FaCloudUploadAlt />
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden-input"
            accept="image/*"
          />
        </div>
        <div className="input-container">
          <FaUser className="input-icon" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
            placeholder="Email"
          />
        </div>
        <div className="input-container">
          <FaUserTag className="input-icon" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={isUploading || !isImageUploaded} // Disable if image is uploading or not uploaded yet
        >
          {isUploading ? "Uploading..." : "Register"}
        </button>
      </form>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default RegisterUser;

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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import { Modal, Button } from "antd";
import "./RegisterUser.css"; // Custom CSS
import { registerUser, checkEmail } from "../../../services/user.services";

const RegisterUser: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [userImageUrl, setuserImageUrl] = useState(""); // Updated from profileImage
  const [isUploading, setIsUploading] = useState(false);
  const [emailError, setEmailError] = useState(""); // Track email validation error
  const [showConfirmation, setShowConfirmation] = useState(false); // Track confirmation modal visibility

  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = useSelector((state: RootState) => state.user.token);

  const orgEmailDomain = process.env.REACT_APP_ORG_EMAIL_DOMAIN;

  // Validate email domain
  const validateEmailDomain = (email: string) => {
    const emailDomain = email.split("@")[1];
    console.log(emailDomain, " --- ", orgEmailDomain);
    if (emailDomain !== orgEmailDomain) {
      setEmailError(`Invalid email id. Please use a ${orgEmailDomain} email.`);
      return false;
    }
    setEmailError("");
    return true;
  };

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
      const response: any = await axios.post(
        "https://api.cloudinary.com/v1_1/dtyiomktp/image/upload", // Replace with your Cloudinary URL
        formData
      );
      setuserImageUrl(response.data.secure_url);
      toast.success(`Image uploaded successfully!`); // Show success toast
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error("Failed to upload image."); // Show error toast
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmailDomain(email)) return;

    if (!userImageUrl) {
      setShowConfirmation(true);
    } else {
      await registerUserHandler();
    }
  };

  const registerUserHandler = async () => {
    try {
      const response: any = await checkEmail(email);
      console.log("fetching user login page", response);
      if (response.userFound !== false) {
        toast.error("User already exists.");
        return;
      } else {
        await registerUser({ username, email, role, userImageUrl });
        toast.success("User registered and invitation sent successfully.");
        setUsername("");
        setEmail("");
        setRole("user");
        setuserImageUrl("");
      }
    } catch (error) {
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
            style={{ borderColor: emailError ? "red" : "initial" }}
          />
          {emailError && (
            <p className="error-text" style={{ color: "red" }}>
              {emailError}
            </p>
          )}
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
          disabled={isUploading} // Disable if image is uploading
        >
          {isUploading ? "Uploading..." : "Register"}
        </button>
      </form>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Registration"
        visible={showConfirmation}
        onOk={async () => {
          setShowConfirmation(false);
          await registerUserHandler();
        }}
        onCancel={() => setShowConfirmation(false)}
        okText="Continue"
        cancelText="Cancel"
      >
        <p>Are you sure you want to continue without a profile image?</p>
      </Modal>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default RegisterUser;

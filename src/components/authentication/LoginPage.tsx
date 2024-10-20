import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import "../../assets/styles/auth.css";
import microsoft from "../../assets/images/microsoft.png";
import loginImg from "../../assets/images/logInImg.png";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css";
import { checkEmail } from "../../services/user.services";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const [email, setEmail] = useState(""); // State for the email input

  const authUrl =
    `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}/oauth2/v2.0/authorize?` +
    new URLSearchParams({
      client_id: process.env.REACT_APP_CLIENT_ID || "",
      response_type: "code",
      redirect_uri: "http://localhost:3000/runway",
      scope: "openid profile email User.read",
      response_mode: "query",
    }).toString();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Update email state on change
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLoginClick(); // Call login logic
    }
  };

  const handleLoginClick = async () => {
    if (email.endsWith("@g7cr.com")) {
      try {
        const response: any = await checkEmail(email);
        console.log("fetching user login page", response);
        if (response.userFound) {
          loadingBarRef.current?.continuousStart();
          window.location.href = authUrl; // Redirect to Microsoft login
        } else {
          toast.error("User not found. Please check your email.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.warn("Please enter a valid G7CR email.");
    }
  };

  // Remove the key press handler to prevent logic execution on Enter key
  useEffect(() => {
    if (getCookie("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-body">
      <LoadingBar color="#f11946" height={10} ref={loadingBarRef} />
      <div className="login-container" id="container">
        <div className="login-sign-in-container">
          <img className="login-img-logo" src={loginImg} alt="Login" />
        </div>
        <div className="login-overlay-container">
          <div className="login-overlay">
            <div className="login-overlay-panel login-overlay-right">
              <strong className="login-e1">Expenses Tracker</strong>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us, please login with your personal info
              </p>
              <div className="email-input-control">
                <input
                  type="email"
                  value={email}
                  onKeyPress={handleKeyPress}
                  onChange={handleEmailChange} // Handle email input change
                  required
                />
                <label>
                  <span style={{ transitionDelay: "0ms" }}>U</span>
                  <span style={{ transitionDelay: "50ms" }}>s</span>
                  <span style={{ transitionDelay: "100ms" }}>e</span>
                  <span style={{ transitionDelay: "150ms" }}>r</span>
                  <span style={{ transitionDelay: "200ms" }}>n</span>
                  <span style={{ transitionDelay: "250ms" }}>a</span>
                  <span style={{ transitionDelay: "300ms" }}>m</span>
                  <span style={{ transitionDelay: "350ms" }}>e</span>
                </label>
              </div>

              <button
                onClick={handleLoginClick} // Call login logic on button click
                className="login-button login-ghost-1"
                id="signUp"
                disabled={!email.endsWith("@g7cr.com")} // Enable/disable based on email
              >
                Login With{" "}
                <img
                  className="login-ms-login-logo"
                  src={microsoft}
                  alt="microsoft-logo"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

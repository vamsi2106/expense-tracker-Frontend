import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import "./auth.css";
import microsoft from "../../assets/images/microsoft.png";
import loginImg from "../../assets/images/logInImg.png";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook for dispatching actions
  const loadingBarRef = useRef<LoadingBarRef>(null); // Use LoadingBarRef type

  const authUrl =
    `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}/oauth2/v2.0/authorize?` +
    new URLSearchParams({
      client_id: process.env.REACT_APP_CLIENT_ID || "",
      response_type: "code",
      redirect_uri: "http://localhost:3000/runway",
      scope: "openid profile email User.read",
      response_mode: "query",
    }).toString();

  const handleLogin = () => {
    console.log("Redirecting to Azure AD...");
    loadingBarRef.current?.continuousStart(); // Start the loading bar
    window.location.href = authUrl;
  };

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
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={handleLogin}
                className="login-button login-ghost-1"
                id="signUp"
              >
                Login With{" "}
                <img
                  className="login-ms-login-logo"
                  src={microsoft}
                  alt="microsoft-logo"
                />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

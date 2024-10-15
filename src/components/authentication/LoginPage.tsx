import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice"; // Import the setUser action

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook for dispatching actions

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
    window.location.href = authUrl;
  };

  useEffect(() => {
    if (getCookie("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login with Azure AD</button>
    </div>
  );
}

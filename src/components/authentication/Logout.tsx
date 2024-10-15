import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { removeCookie } from "../../utils/cookieUtils";

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch logout to clear the Redux state
    dispatch(logout());

    // Remove authentication and role cookies
    removeCookie("token");
    removeCookie("role");

    // Clear local storage/session storage if needed
    localStorage.clear();
    sessionStorage.clear();

    // Azure AD logout URL
    const azureLogoutUrl = `https://login.microsoftonline.com/${
      process.env.REACT_APP_TENANT_ID
    }/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
      "http://localhost:3000/login" // Set the login page after logout
    )}`;

    // Redirect to Azure AD logout URL
    window.location.href = azureLogoutUrl;
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

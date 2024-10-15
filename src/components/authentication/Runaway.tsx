// src/components/Runaway.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../../utils/cookieUtils";

function Runway() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    console.log("query", query);
    const code = query.get("code");

    if (code) {
      // Send the authorization code to the backend to exchange for tokens
      const exchangeCodeForTokens = async () => {
        try {
          console.log("code", code);
          const response = await axios.post(
            "http://localhost:5000/auth/callback",
            {
              code,
            }
          );
          console.log("user data", response.data);

          // setCookie("token", response.data.toString(), 3);
          // setCookie("role", "user", 3);
          // navigate("/");
        } catch (e) {
          console.log(e);
        }
      };

      exchangeCodeForTokens();
    } else {
      // Handle error or missing code
      console.error("No authorization code found.");
    }
  }, []);

  return (
    <div>
      <h2>Processing authentication...</h2>
    </div>
  );
}

export default Runway;

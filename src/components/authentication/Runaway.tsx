import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice"; // Import the setUser action

function Runway() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook for dispatching actions

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code) {
      const exchangeCodeForTokens = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/auth/callback",
            {
              code,
            }
          );
          // Destructure necessary data from response
          const { token, role, name } = response.data;
          console.log(
            "responseData ",
            `${{ usertoken: token, userName: name, Role: role }}`
          );

          // Store token and role in cookies
          setCookie("token", token, 3);
          setCookie("role", role, 3);

          // Dispatch the user data to Redux store
          dispatch(setUser({ token, role, name }));

          // Redirect based on the user's role
          if (role === "admin") {
            navigate("/admin"); // Redirect to admin dashboard
          } else if (role === "user") {
            navigate("/user"); // Redirect to user dashboard
          } else {
            // Handle other roles if necessary
            console.error("Invalid role.");
          }
        } catch (e) {
          console.error(e);
        }
      };

      exchangeCodeForTokens();
    } else {
      console.error("No authorization code found.");
    }
  }, [location.search, navigate, dispatch]);

  return (
    <div>
      <h2>Processing authentication...</h2>
    </div>
  );
}

export default Runway;

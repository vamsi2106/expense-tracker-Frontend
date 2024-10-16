import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice"; // Import the setUser action

interface AuthResponse {
  token: string;
  role: string;
  username: string;
  userEmail: string;
}

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
          console.log(response);

          // profileImage: null;
          // role: "admin";
          // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZjZjODNlOC0wZDdlLTQ4NWMtOTQ3ZC1lMTNjMTQwYmQ4NDAiLCJ1c2VybmFtZSI6IlZhbXNpIiwidXNlckltYWdlVXJsIjpudWxsLCJlbWFpbCI6Im5hZ2FzYWkudmFtc2lAZzdjci5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDI0LTEwLTE0VDE2OjU0OjIzLjQyM1oiLCJ1cGRhdGVkQXQiOiIyMDI0LTEwLTE0VDE2OjU0OjIzLjQyM1oiLCJpYXQiOjE3Mjg5OTc2NDUsImV4cCI6MTcyOTAwMTI0NX0.YqSTRSLB1KptTo131D9WQ_TFxBTSWaT8s_hcBYF_lgM";
          // userEmail: "nagasai.vamsi@g7cr.com";
          // username: "Vamsi";
          const { token, role, username, userEmail } = response.data as AuthResponse;

          // Store token and role in cookies
          setCookie("token", token, 3);
          setCookie("role", role, 3);

          // Dispatch the user data to Redux store
          dispatch(setUser({ token, role, username, userEmail }));

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

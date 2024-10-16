import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice"; // Import the setUser action
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { Grid } from "react-loader-spinner";

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
  const [progress, setProgress] = useState(0);
  const loadingBarRef = useRef<LoadingBarRef>(null); // Correct type

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code) {
      const exchangeCodeForTokens = async () => {
        setProgress(20); // Start the progress bar
        loadingBarRef.current?.continuousStart(); // Start the loading bar

        try {
          const response = await axios.post(
            "http://localhost:5000/auth/callback",
            {
              code,
            }
          );
          console.log(response);
          // if (response.data.error && response.data.redirect) {
          //   // User not found, redirect to login page
          //   alert("User not found. Redirecting to login page.");
          //   navigate("/login");
          //   return;
          // } else {
          const { token, role, username, userEmail } = response.data as AuthResponse;

          setCookie("token", token, 3);
          setCookie("role", role, 3);

          dispatch(setUser({ token, role, username, userEmail }));

          setProgress(100); // Complete the progress bar
          loadingBarRef.current?.complete(); // Complete the loading bar
          // Redirect based on the user's role
          // Uncomment and modify this according to your application's logic
          if (role === "admin") {
            navigate("/admin");
          } else if (role === "user") {
            navigate("/user");
          } else {
            console.error("Invalid role.");
            navigate("/login");
          }
          // }
        } catch (e) {
          console.error(e);
          setProgress(100); // Complete in case of error
          loadingBarRef.current?.complete();
        }
      };

      exchangeCodeForTokens();
    } else {
      console.error("No authorization code found.");
    }
  }, [location.search, navigate, dispatch]);

  return (
    <>
      <LoadingBar
        height={10}
        color="#f11946"
        ref={loadingBarRef}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="div-center">
        <Grid
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    </>
  );
}

export default Runway;

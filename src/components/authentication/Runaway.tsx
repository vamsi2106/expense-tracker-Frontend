import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie, removeCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/user/userSlice";
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
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const loadingBarRef = useRef<LoadingBarRef>(null);

  const tenantId = "380a88f6-5447-406c-bebb-2c908f53f0a3"; // Your tenant ID
  const microsoftLogoutUrl = `https://login.microsoftonline.com/${
    process.env.REACT_APP_TENANT_ID
  }/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
    "http://localhost:3000/login"
  )}&prompt=none`; // Ensure full logout

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code) {
      const exchangeCodeForTokens = async () => {
        setProgress(20);
        loadingBarRef.current?.continuousStart();

        try {
          const response: any = await axios.post(
            "http://localhost:5000/auth/callback",
            { code }
          );

          console.log("response", response);

          if (response.data.error && response.data.redirect) {
            // Automatically log out from both Microsoft and your app if user is not found
            removeCookie("token");
            removeCookie("role");
            localStorage.clear();
            sessionStorage.clear();

            // Redirect to Microsoft logout URL to clear SSO session and prompt for account selection
            window.location.href = microsoftLogoutUrl;
            return;
          }

          const { token, role, username, userEmail, userid, userImageUrl } =
            response.data;

          setCookie("token", token, 3);
          setCookie("role", role, 3);

          dispatch(
            setUser({ token, role, username, userEmail, userid, userImageUrl })
          );

          setProgress(100);
          loadingBarRef.current?.complete();

          if (role === "admin") {
            navigate("/admin");
          } else if (role === "user") {
            navigate("/user");
          } else {
            console.error("Invalid role.");
            navigate("/login");
          }
        } catch (e) {
          console.error(e);
          setProgress(100);
          loadingBarRef.current?.complete();
          navigate("/login");
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
          color="#f11946"
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

// src/services/axios.ts
import axios from "axios";
import { getCookie } from "../utils/cookieUtils"; // Assuming you have a utility to get cookies

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token"); // Get token from cookies
    if (token) {
      config.headers = config.headers || {}; // Ensure headers is an object
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        "Server Error:",
        error.response.data.message || error.response.statusText
      );
      return Promise.reject(
        new Error(error.response.data.message || "Something went wrong!")
      );
    } else if (error.request) {
      console.error("No response from server:", error.request);
      return Promise.reject(
        new Error("No response from server. Please try again later.")
      );
    } else {
      console.error("Request Error:", error.message);
      return Promise.reject(
        new Error("Unable to send the request. Please try again.")
      );
    }
  }
);

export default axiosInstance;
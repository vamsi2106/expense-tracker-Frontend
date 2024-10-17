import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout after 10 seconds
});

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // If the request succeeds, just return the response
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with a status outside of 2xx
      console.error('Server Error:', error.response.data.message || error.response.statusText);
      return Promise.reject(new Error(error.response.data.message || 'Something went wrong!'));
    } else if (error.request) {
      // Request made but no response received
      console.error('No response from server:', error.request);
      return Promise.reject(new Error('No response from server. Please try again later.'));
    } else {
      // Something went wrong in setting up the request
      console.error('Request Error:', error.message);
      return Promise.reject(new Error('Unable to send the request. Please try again.'));
    }
  }
);

export default axiosInstance;

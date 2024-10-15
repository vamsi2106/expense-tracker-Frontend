// src/components/HomePage.tsx
import React from "react";
import Logout from "../authentication/Logout"; // Import the Logout component

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <Logout /> {/* Include the Logout button */}
    </div>
  );
};

export default HomePage;

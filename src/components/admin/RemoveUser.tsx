import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store";

const RemoveUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { users } = useSelector((state: RootState) => state.usersList);
  console.log("remove component", users);
  const token = useSelector((state: RootState) => state.user.token);

  const handleRemove = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("state email", email);
    const user = users.find((user) => user.email === email); // Find user by email
    const { userId }: any = user;
    console.log("handleremove", user);

    if (!user) {
      setMessage("User not found.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/users/remove/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("User removed successfully.");
    } catch (error) {
      console.error("Error removing user", error);
      setMessage("Failed to remove user.");
    }
  };

  return (
    <div>
      <h2>Remove User</h2>
      <form onSubmit={handleRemove}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Remove User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RemoveUser;

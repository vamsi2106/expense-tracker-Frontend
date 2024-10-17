import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/index";
import { fetchUsers } from "../../../store/usersListSlice";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import "./UsersList.css";

const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.usersList
  );
  const token: any = useSelector((state: RootState) => state.user.token);

  const [selectedUser, setSelectedUser] = useState<string | null>(null); // Track the user to be deleted
  const [showConfirmation, setShowConfirmation] = useState(false); // Control confirmation modal visibility

  // Fetch users on component mount or when token is updated
  useEffect(() => {
    if (token) {
      toast.info("Toast is working!");
      dispatch(fetchUsers(token));
    }
  }, [token, dispatch]);

  // Show a toast notification on success or error
  const handleDelete = async () => {
    const user = users.find((u) => u.userId === selectedUser);

    if (!user) {
      toast.error("User not found.");
      return;
    }

    try {
      // Show a loading state in case the request takes time
      toast.info("Deleting user...");

      const response = await axios.delete(
        `http://localhost:5000/users/remove/${user.userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Check if the deletion was successful by examining the response status
      if (response.status === 200) {
        toast.success("User removed successfully.");
        setShowConfirmation(false);
        dispatch(fetchUsers(token)); // Re-fetch users after deletion
      } else {
        // Handle unexpected response status
        toast.error("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error removing user", error);
      toast.error("Failed to remove user. Server error.");
    } finally {
      // Ensure any final actions happen, like clearing the selected user, if needed
      setSelectedUser(null);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Users List</h2>
      {error && <p>{error}</p>}
      {users.length === 0 && !error && <p>No users found.</p>}
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Action</th> {/* New Action Column */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.userId}>
                <td>{index + 1}</td>
                <td>{user.username || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      setSelectedUser(user.userId);
                      setShowConfirmation(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this user?</p>
            <button onClick={handleDelete} className="confirm-btn">
              Confirm
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default UsersList;

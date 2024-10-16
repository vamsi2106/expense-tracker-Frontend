import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchUsers } from "../../store/usersListSlice";
import "./UsersList.css";

const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.usersList
  );
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [token, dispatch]);

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
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;

// src/store/usersListSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "usersList/fetchUsers",
  async (token: string) => {
    const response = await axios.get("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("userList", response);
    return response.data;
  }
);

interface UsersListState {
  users: [];
  loading: boolean;
  error: string | null;
}

const initialState: UsersListState = {
  users: [],
  loading: false,
  error: null,
};

const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users.";
      });
  },
});

export default usersListSlice.reducer;

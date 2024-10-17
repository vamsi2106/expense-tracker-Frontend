import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ReactNode } from "react";

// Define your user interface
interface User {
  role: ReactNode;
  username: string;
  userId: string | null;
  id: string;
  name: string;
  email: string;
}

// Define the slice's initial state
interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk<User[], string>(
  "usersList/fetchUsers",
  async (token: string) => {
    const response = await axios.get<User[]>("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("userList", response);
    return response.data;
  }
);

interface UsersListState {
  users: Array<{
    id: string;
    username: string;
    email: string;
    role: string;
    userId: string;
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
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
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload; // Now correctly typed as User[]
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users.";
      });
  },
});

export default usersListSlice.reducer;

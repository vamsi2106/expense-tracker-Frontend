// src/store/usersListSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUsers as fetchUsersService,
  deleteUser as deleteUserService,
} from "../services/user.services";
import usersListReducer from "./usersListSlice"; // Ensure this is imported

interface User {
  role: string;
  username: string;
  userId: string | null;
  id: string;
  email: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const fetchUsers = createAsyncThunk<User[], void>(
  "usersList/fetchUsers",
  async () => {
    const response = await fetchUsersService();
    return response;
  }
);

export const deleteUser = createAsyncThunk<void, { userId: string }>(
  "usersList/deleteUser",
  async ({ userId }) => {
    await deleteUserService(userId);
  }
);

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
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users.";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user: User) => user.userId !== action.meta.arg.userId
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete user.";
      });
  },
});

export default usersListSlice.reducer;

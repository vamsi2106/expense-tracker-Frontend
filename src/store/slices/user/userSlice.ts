// src/store/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { checkEmail } from "../../../services/user.services";

interface UserState {
  token: string | null;
  role: string | null;
  userid: string | null;
  username: string | null;
  userEmail: string | null;
  profileImg: string | null;
}

const initialState: UserState = {
  token: null,
  role: null,
  userid: null,
  username: null,
  userEmail: null,
  profileImg: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (email: string) => {
    const response = await checkEmail(email);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        token: string;
        role: string;
        username: string;
        userEmail: string;
        userid: string;
        userImageUrl: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userid = action.payload.userid;
      state.username = action.payload.username;
      state.userEmail = action.payload.userEmail;
      state.profileImg = action.payload.userImageUrl;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.username = null;
      state.userEmail = null;
      state.userid = null;
      state.profileImg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        // Handle login success
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Handle login failure
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

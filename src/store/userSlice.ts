
// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  role: string | null;
  username: string | null;
  userEmail: string | null;
}

const initialState: UserState = {
  token: null,
  role: null,
  username: null,
  userEmail: null,
};

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
      }>
    ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.userEmail = action.payload.userEmail;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.username = null;
      state.userEmail = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

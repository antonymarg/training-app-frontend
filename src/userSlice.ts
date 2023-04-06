import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserRole } from "./types";

type UserProfile = {
  email: string;
  name: string;
};

interface UserState {
  profile?: UserProfile;
  isLoggedIn: boolean;
  role: UserRole;
}

const initialState: UserState = {
  isLoggedIn: false,
  role: "public",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = "public";
    },
  },
});

export const { setUserRole, login, logout } = userSlice.actions;

export const getUserProfile = (state: RootState) => state.user.profile;
export const isUserLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getUserRole = (state: RootState) => state.user.role;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserRole } from "./lib/types";

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
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    login: (state, action) => {
      state = {
        ...state,
        isLoggedIn: true,
        role: action.payload.role,
        profile: {
          email: action.payload.email,
          name: action.payload.name,
        },
      };
      return state;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
    },
    createUser: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.profile = {
        email: action.payload.email,
        name: action.payload.name,
      };
    },
  },
});

export const { setUserRole, login, logout, createUser } = userSlice.actions;

export const getUserProfile = (state: RootState) => state.user.profile;
export const isUserLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getUserRole = (state: RootState) => state.user.role;
export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;

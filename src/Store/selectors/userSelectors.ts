import { RootState } from "../store";

export const getUserProfile = (state: RootState) => state.user.profile;
export const isUserLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getUserRole = (state: RootState) => state.user.role;
export const getUser = (state: RootState) => state.user;

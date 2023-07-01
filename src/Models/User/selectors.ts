import { IRootState } from '../types';

export const getUser = (state: IRootState) => state.user;
export const getUserProfile = (state: IRootState) => state.user.profile;

export const isUserLoggedIn = (state: IRootState) => state.user.isLoggedIn;
export const getUserRole = (state: IRootState) => state.user.profile.role;

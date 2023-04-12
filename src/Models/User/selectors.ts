import { IRootState } from '../types';

export const getUserProfile = (state: IRootState) => state.user.profile;
export const isUserLoggedIn = (state: IRootState) => state.user.isLoggedIn;
export const getUserRole = (state: IRootState) => state.user.profile?.role;
export const getUser = (state: IRootState) => state.user;
export const getState = (state: IRootState) => state;

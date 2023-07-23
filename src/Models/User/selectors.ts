import { IRootState } from '../types';
import { IUserProfile } from './types';

export const getUser = (state: IRootState) => state.user;
export const getUserProfile = (state: IRootState): IUserProfile | null =>
  state.user.profile ?? null;

export const isUserLoggedIn = (state: IRootState) => state.user.isLoggedIn;
export const getUserRole = (state: IRootState) => state.user.profile?.role;

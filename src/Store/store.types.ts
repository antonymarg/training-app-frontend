import { UserProfile, UserRole } from "../lib/types";

export interface UserState {
  profile?: UserProfile;
  isLoggedIn: boolean;
  role: UserRole;
}

export interface RootState {
  user: UserState;
}

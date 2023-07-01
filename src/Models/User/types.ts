export interface IUserState {
  profile: IUserProfile;
  isLoggedIn: boolean;
}
export interface IUserProfile {
  userId?: string;
  email?: string;
  name?: string;
  surname?: string;
  role?: IUserRole;
}

export type IUserRole = 'trainer' | 'participant';

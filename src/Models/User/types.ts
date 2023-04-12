export type IUserRole = 'trainer' | 'participant' | null;

export interface IUserProfile {
  email: string;
  name: string;
  role: IUserRole;
}

export interface IUserState {
  profile?: IUserProfile;
  isLoggedIn: boolean;
}

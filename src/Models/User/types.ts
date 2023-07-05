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
  dateOfBirth?: Date;
  gender?: IGender;
  bio?: string;
}

export type IUserRole = 'trainer' | 'participant';
export type IGender = 'Male' | 'Female' | 'Non-binary' | 'Other' | '';

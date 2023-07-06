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
  dateOfBirth?: string | Date;
  gender?: IGender;
  bio?: string;
  imgSrc?: string;
  imgFirebasePath?: string;
}

export type IUserRole = 'trainer' | 'participant';
export type IGender =
  | 'Male'
  | 'Female'
  | 'Non-binary'
  | 'Gender fluid'
  | 'Agender'
  | 'Prefer not to say'
  | '';

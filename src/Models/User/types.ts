export type IUserRole = 'trainer' | 'participant' | null;

export interface IUserProfile {
  userId: string;
  email: string;
  name: string;
  role: IUserRole;
}

export interface IUserState {
  profile?: IUserProfile;
  isLoggedIn: boolean;
}

// Signup
export interface ISignupWithEmailFormData extends Omit<IUserProfile, 'userId'> {
  password: string;
}
export interface ISignUpFormErrors {
  emailError?: string;
  passwordError?: string;
  nameError?: string;
  genericError?: string;
}

// login

export interface IUserId {
  userId: string;
}

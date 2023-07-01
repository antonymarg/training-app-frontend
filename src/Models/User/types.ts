import { IUserCredentials } from '../../Firebase/userModule/userModule.types';

export type IUserRole = 'trainer' | 'participant';

export interface IUserProfile {
  userId?: string;
  email?: string;
  name?: string;
  role?: IUserRole;
}

export interface IUserState {
  profile?: IUserProfile;
  isLoggedIn: boolean;
  error?: IUserError;
  hasUserSignedUp?: boolean;
}
export interface IUserError {
  signupError?: ISignUpFormErrors;
  loginError?: ILoginFormErrors;
}
// Signup
export interface ISignupWithEmailFormData extends Omit<IUserProfile, 'userId'> {
  password: string;
}
export interface ISignUpFormErrors {
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
  genericError?: string;
}

// login
export interface IUserId {
  userId: string;
}

export interface ILoginFormErrors {
  emailError?: string;
  passwordError?: string;
  genericError?: string;
}

export type ILoginWithEmailFormData = IUserCredentials;

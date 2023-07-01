import { IUserCredentials } from '../../Firebase/userModule/userModule.types';
import { createAction } from '../../lib/actionCreator';
import {
  ISignupWithEmailFormData,
  IUserProfile,
  IUserId,
  ILoginFormErrors,
  IUserError,
} from './types';

const userActionCreator = createAction('USER');

// REDUCER ACTIONS
export const updateUserLogin = userActionCreator('UPDATE_USER_LOGIN');
export const updateUserLogout = userActionCreator('UPDATE_USER_LOGOUT');
export const updateUserProfile = userActionCreator<IUserProfile>(
  'UPDATE_USER_PROFILE'
);
export const updateUserUid = userActionCreator<string>('UPDATE_USER_UID');

// -- Sign up
export const startSignupWithEmail = userActionCreator<ISignupWithEmailFormData>(
  'INIT_SINGUP_WITH_EMAIL'
);
export const createUserWithEmail = userActionCreator<ISignupWithEmailFormData>(
  'CREATE_USER_WITH_EMAIL'
);

export const createUserProfile = userActionCreator<IUserProfile>(
  'CREATE_USER_PROFILE'
);

export const createUserSuccess = userActionCreator('CREATE_USER_SUCCESS');

export const createUserFailed = userActionCreator('CREATE_USER_FAILED');
// -- Login
export const startLoginWithEmail = userActionCreator<IUserCredentials>(
  'INIT_LOGIN_WITH_EMAIL'
);
export const startLoginWithGoogle = userActionCreator('INIT_LOGIN_WITH_GOOGLE');
export const getUserInfo = userActionCreator<IUserId>('INIT_LOGIN_WITH_EMAIL');

export const loginUserSuccess = userActionCreator('LOGIN_USER_SUCCESS');
export const loginUserFailed =
  userActionCreator<ILoginFormErrors>('LOGIN_USER_FAILED');

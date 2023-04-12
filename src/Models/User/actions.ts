import { createAction } from '../../lib/actionCreator';
import { IUserProfile } from './types';

const userActionCreator = createAction('USER');

export const updateUserLogin = userActionCreator('UPDATE_USER_LOGIN');
export const updateUserLogout = userActionCreator('UPDATE_USER_LOGOUT');
export const updateUserProfile = userActionCreator<IUserProfile>(
  'UPDATE_USER_PROFILE'
);

// export const INIT_SIGNUP_WITH_EMAIL = 'INIT_SIGNUP_WITH_EMAIL';
// export const SIGNUP_WITH_EMAIL_VALIDATION_SUCCESS =
//   'SIGNUP_WITH_EMAIL_VALIDATION_SUCCESS';
// export const SIGNUP_WITH_EMAIL_VALIDATION_FAILED =
//   'SIGNUP_WITH_EMAIL_VALIDATION_FAILED';
// export const CREATE_USER = 'CREATE_USER';
// export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
// export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';
// export const CREATE_USER_PROFILE = 'CREATE_USER_PROFILE';
// export const CREATE_USER_PROFILE_SUCCESS = 'CREATE_USER_PROFILE_SUCCESS';
// export const CREATE_USER_PROFILE_FAILED = 'CREATE_USER_PROFILE_FAILED';
// export const INIT_LOGIN_WITH_EMAIL = 'INIT_LOGIN_WITH_EMAIL';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILED = 'LOGIN_FAILED';
// export const FETCH_USER_DATA = 'FETCH_USER_DATA';
// export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
// export const FETCH_USER_DATA_FAILED = 'FETCH_USER_DATA_FAILED';
// export const STORE_USER_DATA = 'STORE_USER_DATA';
// export const STORE_USER_DATA_SUCCESS = 'STORE_USER_DATA_SUCCESS';
// export const STORE_USER_DATA_FAILED = 'STORE_USER_DATA_FAILED';
// // export const LOGOUT = 'LOGOUT';
// export const UPDATE_USER_LOGIN = 'UPDATE_USER_LOGIN';
// export const UPDATE_USER_LOGOUT = 'UPDATE_USER_LOGOUT';
// export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

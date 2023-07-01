import { createAction } from '../../lib/actionCreator';
import { IUserProfile } from './types';

const userActionCreator = createAction('USER');

export const updateUserLogin = userActionCreator('UPDATE_USER_LOGIN');
export const updateUserLogout = userActionCreator('UPDATE_USER_LOGOUT');
export const updateUserProfile = userActionCreator<IUserProfile>(
  'UPDATE_USER_PROFILE'
);

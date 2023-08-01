import { IRootState } from './types';
import { initialState as userState } from './User/initialState';
import { initialState as notificationsState } from './Notifications/initialState';

export const initialState: IRootState = {
  user: userState,
  notifications: notificationsState,
};

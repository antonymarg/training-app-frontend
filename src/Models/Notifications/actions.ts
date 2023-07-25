import { createAction } from '../../lib/actionCreator';
import { INotification } from './types';

const userActionCreator = createAction('NOTIFS');

export const addNotification =
  userActionCreator<INotification>('ADD_NOTIFICATION');

export const clearNotifications = userActionCreator('CLEAR_NOTIFICATIONS');

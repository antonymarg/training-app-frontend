import { createAction } from '../../lib/actionCreator';
import { INotification } from './types';

const userActionCreator = createAction('NOTIFS');

export const updateNotifications = userActionCreator<INotification[]>(
  'UPDATE_NOTIFICATIONS'
);

export const clearNotifications = userActionCreator('CLEAR_NOTIFICATIONS');

import { INotification } from './types';
import { initialState } from './initialState';
import { IAction } from '../../lib/actionCreator';
import { createSlice } from '@reduxjs/toolkit';
import { updateNotifications, clearNotifications } from './actions';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      updateNotifications,
      (state, action: IAction<INotification[]>) => {
        let notifications = [...state];
        for (let notif of action.payload) {
          let indexOfNotif = notifications.findIndex(
            (n) => n.notificationId === notif.notificationId
          );
          if (indexOfNotif !== -1) notifications[indexOfNotif] = notif;
          else notifications.unshift(notif);
        }
        return notifications;
      }
    );
    builder.addCase(clearNotifications, () => []);
  },
});

export default notificationsSlice.reducer;

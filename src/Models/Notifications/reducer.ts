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
        return action.payload;
      }
    );
    builder.addCase(clearNotifications, () => []);
  },
});

export default notificationsSlice.reducer;

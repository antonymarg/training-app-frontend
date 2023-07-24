import { INotification } from './types';
import { initialState } from './initialState';
import { IAction } from '../../lib/actionCreator';
import { createSlice } from '@reduxjs/toolkit';
import { addNotification } from './actions';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      addNotification,
      (state, action: IAction<INotification>) => {
        return {
          ...state,
          activeNotifications: {
            ...state.activeNotifications,
            [action.payload.id]: action.payload,
          },
        };
      }
    );
  },
});

export default notificationsSlice.reducer;

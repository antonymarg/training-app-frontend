import { IUserProfile } from './types';
import { initialState } from './initialState';
import { IAction } from '../../lib/actionCreator';
import { createSlice } from '@reduxjs/toolkit';
import {
  updateUserLogin,
  updateUserLogout,
  updateUserProfile,
} from './actions';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserLogin, (state) => {
        state.isLoggedIn = true;
        return state;
      })
      .addCase(updateUserLogout, (state) => {
        return {
          ...state,
          isLoggedIn: false,
          profile: undefined,
        };
      })
      .addCase(updateUserProfile, (state, action: IAction<IUserProfile>) => {
        return {
          ...state,
          profile: action.payload,
        };
      });
  },
});

export default userSlice.reducer;

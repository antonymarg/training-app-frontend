import { IUserProfile } from './types';
import { initialState } from './initialState';
import { IAction } from '../../lib/actionCreator';
import { createSlice } from '@reduxjs/toolkit';
import {
  createUserSuccess,
  updateUserError,
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
      .addCase(createUserSuccess, (state) => {
        state.hasUserSignedUp = true;
      })
      .addCase(updateUserError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUserLogin, (state) => {
        state.isLoggedIn = true;
        return state;
      })
      .addCase(updateUserLogout, (state) => {
        return {
          ...state,
          role: null,
          profile: undefined,
          isLoggedIn: false,
        };
      })
      .addCase(updateUserProfile, (state, action: IAction<IUserProfile>) => {
        return {
          ...state,
          profile: action.payload as IUserProfile,
        };
      });
  },
});

export default userSlice.reducer;

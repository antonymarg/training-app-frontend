import { IUserProfile } from './types';
import { initialState } from './initialState';
import { IAction } from '../../lib/actionCreator';
import { createSlice } from '@reduxjs/toolkit';
import {
  createUserSuccess,
  updateUserLogin,
  updateUserLogout,
  updateUserProfile,
  updateUserUid,
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
      })
      .addCase(updateUserUid, (state, action: IAction<string>) => {
        return {
          ...state,
          profile: {
            ...state.profile,
            userId: action.payload,
          },
        };
      });
  },
});

export default userSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserSuccess,
  startLoginWithEmail,
  startSignupWithEmail,
  updateUserError,
  updateUserLogin,
  updateUserProfile,
} from './actions';
import { userModule } from '../../Firebase';
import {
  ISignUpFormErrors,
  ISignupWithEmailFormData,
  ILoginFormErrors,
  ILoginWithEmailFormData,
} from './types';

export const startSignupWithEmailThunk = createAsyncThunk<
  any,
  ISignupWithEmailFormData
>(startSignupWithEmail.type, async (payload, { dispatch }) => {
  try {
    let { email, password, ...newUserInfo } = payload;
    let { user } = await userModule.signUpUserWithEmailAndPassword({
      email,
      password,
    });
    let newUser = { userId: user.uid, email, password, ...newUserInfo };
    await userModule.createUserProfile(newUser);
    dispatch(createUserSuccess());
  } catch (error: any) {
    let signupError: ISignUpFormErrors = {};
    switch (error.code) {
      case 'auth/invalid-email':
        signupError = { emailError: 'This email is invalid' };
        break;
      case 'auth/weak-password':
        signupError = {
          passwordError: 'This password is weak',
        };
        break;
      default:
        signupError = {
          genericError: 'A sudden error occurred',
        };
    }
    dispatch(updateUserError({ signupError }));
  }
});

export const startLoginWithEmailThunk = createAsyncThunk<
  any,
  ILoginWithEmailFormData
>(startLoginWithEmail.type, async (payload, { dispatch }) => {
  try {
    let {
      user: { uid },
    } = await userModule.signInWithUserAndEmail(payload);
    if (!uid) throw new Error();
    let user = await userModule.getUser(uid);
    dispatch(updateUserLogin());
    dispatch(updateUserProfile(user));
  } catch (error: any) {
    let loginError: ILoginFormErrors = {};
    switch (error.code) {
      case 'auth/invalid-email':
        loginError = { emailError: 'This email is invalid' };
        break;
      case 'auth/wrong-password':
        loginError = { passwordError: 'This password is wrong' };
        break;
      default:
        loginError = { genericError: 'A sudden error occurred' };
    }
    dispatch(updateUserError({ loginError }));
  }
});

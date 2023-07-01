import { createAsyncThunk } from '@reduxjs/toolkit';
// import { createUserSuccess, startSignupWithEmail } from './actions';
// import { userModule } from '../../Firebase';
// import { ISignUpFormErrors, ISignupWithEmailFormData } from './types';

// export const startSignupWithEmailThunk = createAsyncThunk<
//   any,
//   ISignupWithEmailFormData
// >(startSignupWithEmail.type, async (payload, { dispatch }) => {
//   try {
//     let { email, password, ...newUserInfo } = payload;

//     let newUser = { userId: user.uid, email, password, ...newUserInfo };
//     await userModule.createUserProfile(newUser);
//     dispatch(createUserSuccess());
//   } catch (error: any) {
//     let signupError: ISignUpFormErrors = {};
//     switch (error.code) {
//       case 'auth/invalid-email':
//         signupError = { emailError: 'This email is invalid' };
//         break;
//       case 'auth/weak-password':
//         signupError = {
//           passwordError: 'This password is weak',
//         };
//         break;
//       default:
//         signupError = {
//           genericError: 'A sudden error occurred',
//         };
//     }
//   }
// });

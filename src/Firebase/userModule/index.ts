import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { getDoc, setDoc, doc } from '@firebase/firestore';
import { auth, db } from '../';
import { IUserCredentials, IUserInfoOnSignUp } from './userModule.types';
import { IUserProfile } from '../../Models/User/types';

const getUser = async (userId: string) => {
  let user = await getDoc(doc(db, 'users', userId));
  return user.data() as IUserProfile;
};

const signUpUserWithEmailAndPassword = async (
  credentials: IUserCredentials
) => {
  return await createUserWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );
};

const createUserProfile = async (userInfo: IUserInfoOnSignUp) => {
  return await setDoc(doc(db, 'users', userInfo.userId), userInfo);
};

const signInWithUserAndEmail = async (credentials: IUserCredentials) => {
  return await signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );
};

export const userModule = {
  getUser,
  signUpUserWithEmailAndPassword,
  createUserProfile,
  signInWithUserAndEmail,
};

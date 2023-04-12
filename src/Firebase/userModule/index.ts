import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { getDoc, setDoc, doc } from '@firebase/firestore';
import { auth, db } from '../';
import { IUserCredentials, IUserInfoOnSignUp } from './userModule.types';

const getUser = (userId: string) => {
  return getDoc(doc(db, 'users', userId));
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

const createUserData = async (userInfo: IUserInfoOnSignUp) => {
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
  createUserData,
  signInWithUserAndEmail,
};

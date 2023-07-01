import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@firebase/auth';
import { getDoc, setDoc, doc } from '@firebase/firestore';
import { auth, db } from '../';
import { IUserCredentials } from './userModule.types';
import { IUserId, IUserProfile } from '../../Models/User/types';
import { provider } from '../firebase';

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

const createUserProfile = async (userInfo: IUserProfile & IUserId) => {
  return await setDoc(doc(db, 'users', userInfo.userId), userInfo);
};

const signInWithUserAndEmail = async (credentials: IUserCredentials) => {
  return await signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );
};

const signInWithGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

export const userModule = {
  getUser,
  signUpUserWithEmailAndPassword,
  createUserProfile,
  signInWithUserAndEmail,
  signInWithGoogle,
};

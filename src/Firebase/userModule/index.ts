import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@firebase/auth';
import { getDoc, setDoc, doc } from '@firebase/firestore';
import { auth, db } from '../';
import { IUserCredentials } from './userModule.types';
import { IUserProfile } from '../../Models/User/types';
import { provider } from '../firebase';
import { getAsset, uploadAsset } from '../assets';

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

const createUserProfile = async (userInfo: IUserProfile) => {
  if (!userInfo.userId) throw new Error();
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

const uploadProfilePicture = async (userId: string, img: File) => {
  let extension = img.name.split('.')[1];
  return await uploadAsset(`users/profilePictures/${userId}.${extension}`, img);
};

const getUserImage = async (imagePath: string) => {
  return await getAsset(imagePath);
};

export const userModule = {
  getUser,
  signUpUserWithEmailAndPassword,
  createUserProfile,
  signInWithUserAndEmail,
  signInWithGoogle,
  uploadProfilePicture,
  getUserImage,
};

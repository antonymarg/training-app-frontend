import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@firebase/auth';
import {
  getDoc,
  setDoc,
  doc,
  query,
  getDocs,
  collection,
  where,
  limit,
} from '@firebase/firestore';
import { assetsModule, auth, db } from '../';
import { IUserCredentials } from './userModule.types';
import { IUserProfile } from '../../Models/User/types';
import { provider } from '../firebase';

const getUserById = async (userId: string, getExtendedProfile = false) => {
  let user: IUserProfile | null =
    ((await getDoc(doc(db, 'users', userId))).data() as IUserProfile) ?? null;
  if (!getExtendedProfile) return user;
  if (user.imgFirebasePath)
    user.imgSrc = await userModule.getUserImage(user.imgFirebasePath);
  return user;
};

const getUsersByEmail = async (fields?: any) => {
  const users: IUserProfile[] = [];
  let whereList = [];
  if (fields.emailStartsWith)
    whereList.push(
      where('email', '>=', fields.emailStartsWith),
      where('email', '<=', fields.emailStartsWith + '\uf8ff')
    );
  if (fields.role) whereList.push(where('role', '==', fields.role));
  let searchQuery = query(collection(db, 'users'), ...whereList, limit(10));
  const queryResults = await getDocs(searchQuery);
  queryResults.forEach((user) => users.push(user.data() as IUserProfile));
  return users;
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
  return await assetsModule.uploadAsset(
    `users/profilePictures/${userId}.${extension}`,
    img
  );
};

const getUserImage = async (imagePath: string) => {
  return await assetsModule.getAsset(imagePath);
};

export const userModule = {
  getUserById,
  getUsersByEmail,
  signUpUserWithEmailAndPassword,
  createUserProfile,
  signInWithUserAndEmail,
  signInWithGoogle,
  uploadProfilePicture,
  getUserImage,
};

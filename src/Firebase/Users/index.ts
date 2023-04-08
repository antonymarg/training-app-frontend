import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { getDoc, setDoc, doc } from "@firebase/firestore";
import { UserCredentials, UserInfoOnSignUp } from "../../lib/types";

const getUser = (userId: string) => {
  return getDoc(doc(db, "users", userId));
};

const signUpUserWithEmailAndPassword = async (credentials: UserCredentials) => {
  return await createUserWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );
};

const createUserData = async (userInfo: UserInfoOnSignUp) => {
  return await setDoc(doc(db, "users", userInfo.userId), userInfo);
};

const signInWithUserAndEmail = async (credentials: UserCredentials) => {
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

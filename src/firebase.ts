import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4Ehdkn_9mVhuZ-lbdGaZ4dEm2K5XtRsY",
  authDomain: "training-thesis-app.firebaseapp.com",
  projectId: "training-thesis-app",
  storageBucket: "training-thesis-app.appspot.com",
  messagingSenderId: "609700443257",
  appId: "1:609700443257:web:917ca003f328a4650490a8",
  measurementId: "G-451VW54RT7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

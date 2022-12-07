import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
export const registerApi = async (data) => {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
};

export const loginApi = async (data) => {
  return signInWithEmailAndPassword(auth, data.email, data.password);
};

export const loginGoogleApi = async (data) => {
  return signInWithPopup(auth, provider);
};

export const signOutApi = async (data) => {
  return signOut(auth);
};

export const updateProfileApi = async (data) => {
  return updateProfile(auth.currentUser, data);
};

export const setPersistanceApi = async (remember) => {
  return setPersistence(
    auth,
    remember ? browserLocalPersistence : browserSessionPersistence
  );
};

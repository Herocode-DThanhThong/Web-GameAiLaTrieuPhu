import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const addRankApi = (data) => {
  return setDoc(doc(db, "users", data.userId), data);
};

export const getInfoUserGameApi = (idUser) => {
  const docRef = doc(db, "users", idUser);
  return getDoc(docRef);
};

export const getAllRankUserApi = () => {
  const q = query(collection(db, "users"), orderBy("point", "desc"), limit(10));
  return getDocs(q);
};

export const getNextPageApi = (lastVisible) => {
  const q = query(
    collection(db, "users"),
    orderBy("point", "desc"),
    startAfter(lastVisible),
    limit(10)
  );
  return getDocs(q);
};

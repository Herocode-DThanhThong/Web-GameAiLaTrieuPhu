import axios from "axios";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ADD_AUDIO_API, DELETE_AUDIO_API } from "../utils/settings";
export const uploadFileAudioToCloudDinaryApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file[0]);
  formData.append("upload_preset", "your_upload_preset");
  return axios.post(ADD_AUDIO_API, formData);
};

export const deleteAudioFromCloudDinaryApi = async (public_id) => {
  return axios.post(DELETE_AUDIO_API, {
    public_id,
  });
};

export const addQuestionApi = (data) => {
  return addDoc(collection(db, "questions"), data);
};

export const getQuestionsApi = () => {
  const q = query(collection(db, "questions"));
  return getDocs(q);
};

export const deleteQuestionApi = (id) => {
  return deleteDoc(doc(db, "questions", id));
};

export const editQuestionApi = (data) => {
  return setDoc(doc(db, "questions", data.id), data);
};

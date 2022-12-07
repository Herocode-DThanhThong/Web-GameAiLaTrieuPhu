import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import {
  addQuestionApi,
  deleteAudioFromCloudDinaryApi,
  deleteQuestionApi,
  getQuestionsApi,
  uploadFileAudioToCloudDinaryApi,
} from "../../services/questionServices";
import { GET_ALL_QUESTION_SAGA, HIDE_MODAL, SET_ALL_QUESTION } from "../types";
import { handleLoading } from "./globalAction";

export function* uploadFileAction(audio) {
  try {
    // Upload file mp3 to cloudinary
    const res = yield call(() => uploadFileAudioToCloudDinaryApi(audio));
    return res;
  } catch (error) {
    toast.error(error?.response?.data?.error?.message);
    console.log(error);
    console.log(error?.response?.data?.error?.message);
  }
  yield call(() => handleLoading(false));
}

export function* addQuestion(action) {
  yield call(() => handleLoading(true));

  try {
    // Upload file mp3 to cloudinary
    const { data } = yield call(() => uploadFileAction(action.data.audio));
    // Save to firebase
    const res = yield call(() =>
      addQuestionApi({
        ...action.data,
        audio: data.url,
        public_id: data.public_id,
      })
    );

    toast("Thêm câu hỏi thành công");

    // Load ques
    yield put({
      type: GET_ALL_QUESTION_SAGA,
    });
    yield put({
      type: HIDE_MODAL,
    });
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
  yield call(() => handleLoading(false));
}

export function* getAllQuestion(action) {
  yield call(() => handleLoading(true));

  try {
    // Save to firebase
    const res = yield call(() => getQuestionsApi());

    // Format data
    let data = [];
    res.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    // Save data to redux
    yield put({
      type: SET_ALL_QUESTION,
      questions: data,
    });
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
  yield call(() => handleLoading(false));
}

export function* deleteQuestion(action) {
  yield call(() => handleLoading(true));

  try {
    // Delete audio from cloudinary
    if (action.data.publicID) {
      yield call(() => deleteAudioFromCloudDinaryApi(action.data.publicID));
    }

    // Save to firebase
    const res = yield call(() => deleteQuestionApi(action.data.id));

    toast("Xóa câu hỏi thành công");
    // Load ques
    yield put({
      type: GET_ALL_QUESTION_SAGA,
    });
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
  yield call(() => handleLoading(false));
}

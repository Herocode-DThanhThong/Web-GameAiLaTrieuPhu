import { takeLatest } from "redux-saga/effects";
import {
  addQuestion,
  deleteQuestion,
  getAllQuestion,
} from "../actions/adminActions";
import {
  ADD_QUESTION_SAGA,
  DELETE_QUESTION_SAGA,
  GET_ALL_QUESTION_SAGA,
} from "../types";

export function* followActionAddQuestionAction() {
  yield takeLatest(ADD_QUESTION_SAGA, addQuestion);
}

export function* followActionGetAllQuestionAction() {
  yield takeLatest(GET_ALL_QUESTION_SAGA, getAllQuestion);
}

export function* followActionDeleteQuestionAction() {
  yield takeLatest(DELETE_QUESTION_SAGA, deleteQuestion);
}

import { all } from "redux-saga/effects";
import {
  followActionAddQuestionAction,
  followActionDeleteQuestionAction,
  followActionGetAllQuestionAction,
} from "./adminSaga";
import {
  followActionLoginGoogle,
  followActionLoginUser,
  followActionRegisterUser,
  followActionSignOut,
} from "./authSaga";
import { followActionAddRank, followActionGetAllRank } from "./rankSaga";
export function* rootSaga() {
  yield all([
    followActionRegisterUser(),
    followActionLoginUser(),
    followActionLoginGoogle(),
    followActionSignOut(),
    followActionAddQuestionAction(),
    followActionGetAllQuestionAction(),
    followActionDeleteQuestionAction(),
    followActionAddRank(),
    followActionGetAllRank(),
  ]);
}

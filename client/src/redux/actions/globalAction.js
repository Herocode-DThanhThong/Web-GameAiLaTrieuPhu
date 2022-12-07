import { put } from "redux-saga/effects";
import { HIDE_LOADING, SHOW_LOADING } from "../types";

export function* handleLoading(isLoading) {
  if (isLoading)
    yield put({
      type: SHOW_LOADING,
    });
  else
    yield put({
      type: HIDE_LOADING,
    });
}

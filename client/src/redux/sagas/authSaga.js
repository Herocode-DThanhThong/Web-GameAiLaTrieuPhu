import { takeLatest } from "redux-saga/effects";
import {
  loginGoogleAction,
  loginUserAction,
  registerUserAction,
  signOutAction,
} from "../actions/authActions";
import {
  LOGIN_GOOGLE_SAGA,
  LOGIN_USER_SAGA,
  REGISTER_USER_SAGA,
  SIGN_OUT_SAGA,
} from "../types";
export function* followActionRegisterUser() {
  yield takeLatest(REGISTER_USER_SAGA, registerUserAction);
}

export function* followActionLoginUser() {
  yield takeLatest(LOGIN_USER_SAGA, loginUserAction);
}

export function* followActionLoginGoogle() {
  yield takeLatest(LOGIN_GOOGLE_SAGA, loginGoogleAction);
}

export function* followActionSignOut() {
  yield takeLatest(SIGN_OUT_SAGA, signOutAction);
}

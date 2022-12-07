import { toast } from "react-toastify";
import { call, select } from "redux-saga/effects";
import {
  loginApi,
  loginGoogleApi,
  registerApi,
  setPersistanceApi,
  signOutApi,
  updateProfileApi,
} from "../../services/authServices";
import { handleLoading } from "./globalAction";

export function* registerUserAction(action) {
  yield call(() => handleLoading(true));
  try {
    const user = yield call(() => registerApi(action.data));
    // Update display name user
    yield call(() =>
      updateProfileApi({
        displayName: action.data.username,
      })
    );

    // Save token to session
    yield call(() => setPersistanceApi(false));

    // Success
    toast("Đăng kí thành công");

    const { navigateFunc } = yield select((state) => state.global);
    navigateFunc("/login");
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
  yield call(() => handleLoading(false));
}

export function* loginUserAction(action) {
  yield call(() => handleLoading(true));

  try {
    const user = yield call(() => loginApi(action.data));
    // Save token to session
    yield call(() => setPersistanceApi(action.data.remember));

    // Success
    toast("Đăng nhập thành công");
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
  yield call(() => handleLoading(false));
}

export function* loginGoogleAction(action) {
  yield call(() => handleLoading(true));

  try {
    const user = yield call(() => loginGoogleApi());

    // Success
    toast("Đăng nhập thành công");

    const { navigateFunc } = yield select((state) => state.global);
    navigateFunc("/");
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
  yield call(() => handleLoading(false));
}

export function* signOutAction(action) {
  yield call(() => handleLoading(true));

  try {
    const user = yield call(() => signOutApi());

    // Success
    toast("Đăng xuất thành công");

    const { navigateFunc } = yield select((state) => state.global);
    navigateFunc("/login");
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
  yield call(() => handleLoading(false));
}

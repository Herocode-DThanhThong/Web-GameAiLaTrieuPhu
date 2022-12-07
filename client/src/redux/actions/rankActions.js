import { toast } from "react-toastify";
import { call, put, select } from "redux-saga/effects";
import {
  addRankApi,
  getAllRankUserApi,
  getInfoUserGameApi,
  getNextPageApi,
} from "../../services/rankServices";
import { SET_ALL_RANKS, SET_DOC } from "../types";
import { handleLoading } from "./globalAction";

export function* addRank(action) {
  yield call(() => handleLoading(true));

  try {
    // Get old point if new point > old point -> update
    const docSnap = yield call(() => getInfoUserGameApi(action.data.userId));
    if (docSnap.exists()) {
      if (docSnap.data().point < action.data.point) {
        // Save to firebase
        yield call(() => addRankApi(action.data));
      }
    } else {
      yield call(() => addRankApi(action.data));
    }
    yield call(() => handleLoading(false));
    if (action.data.point === 12) {
      if (window.confirm("👑 Chúc mừng bạn đã chiến thắng 👑")) {
        window.location.reload();
      }
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
  }
  yield call(() => handleLoading(false));
}

export function* getAllRank(action) {
  yield call(() => handleLoading(true));

  try {
    let res;
    let data = [];
    const { doc, ranks } = yield select((state) => state.ranks);
    if (doc) {
      res = yield call(() => getNextPageApi(doc));
      // Add data to redux
      // Keep old data
      data = [...ranks];
      res.forEach((doc) => {
        // Push data new
        data.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      // Set docSnap to get next page
      yield put({
        type: SET_DOC,
        doc: res.docs[res.docs.length - 1],
      });
    } else {
      res = yield call(() => getAllRankUserApi());

      // Set docSnap to get next page
      yield put({
        type: SET_DOC,
        doc: res.docs[res.docs.length - 1],
      });

      // Add data to redux
      res.forEach((doc) => {
        data.push({
          ...doc.data(),
          id: doc.id,
        });
      });
    }

    yield put({
      type: SET_ALL_RANKS,
      result: data,
    });
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
  }
  yield call(() => handleLoading(false));
}

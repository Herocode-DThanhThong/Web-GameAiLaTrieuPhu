import { takeLatest } from "redux-saga/effects";
import { addRank, getAllRank } from "../actions/rankActions";
import { GET_ALL_RANK_USER, SET_RANK_SAGA } from "../types";
export function* followActionAddRank() {
  yield takeLatest(SET_RANK_SAGA, addRank);
}

export function* followActionGetAllRank() {
  yield takeLatest(GET_ALL_RANK_USER, getAllRank);
}

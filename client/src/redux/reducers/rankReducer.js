import { SET_ALL_RANKS, SET_DOC } from "../types";

const initialState = {
  ranks: [],
  doc: "",
};

export const rankReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_RANKS: {
      return {
        ...state,
        ranks: action.result,
      };
    }

    case SET_DOC: {
      return {
        ...state,
        doc: action.doc,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

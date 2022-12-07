import { SET_ALL_QUESTION } from "../types";

const initialState = {
  questions: [],
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_QUESTION: {
      return {
        ...state,
        questions: action.questions,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

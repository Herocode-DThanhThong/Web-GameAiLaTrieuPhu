import { SET_USER } from "../types";

const initialState = {
  user: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

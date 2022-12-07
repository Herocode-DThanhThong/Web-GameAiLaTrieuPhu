import {
  ADD_NAVIGATE,
  CLEAR_REMOVE_HALF_ANSWER_OPTION,
  HIDE_LOADING,
  HIDE_MODAL,
  SET_AUDIENCE_ANSWER_OPTION,
  SET_CALL_OPTION,
  SET_CHOOSE_ANSWER,
  SET_REMOVE_HALF_ANSWER_OPTION,
  SHOW_LOADING,
  SHOW_MODAL,
  TURN_OFF_VOLUMN,
  TURN_ON_VOLUMN,
} from "../types";

const initialState = {
  loading: false,
  navigateFunc: null,
  isOpenVolumn: false,
  chooseAns: false,
  showModal: false,
  componentModal: <>Hello</>,
  callOption: false,
  removeHalfAnsOption: {
    touched: false,
    flag: true,
  },
  audienceAnsOption: false,
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TURN_ON_VOLUMN: {
      return {
        ...state,
        isOpenVolumn: true,
      };
    }
    case TURN_OFF_VOLUMN: {
      return {
        ...state,
        isOpenVolumn: false,
      };
    }

    case SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case HIDE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

    case SET_CHOOSE_ANSWER: {
      return {
        ...state,
        chooseAns: true,
      };
    }

    case ADD_NAVIGATE: {
      return {
        ...state,
        navigateFunc: action.navigate,
      };
    }

    case SHOW_MODAL: {
      return {
        ...state,
        showModal: true,
        componentModal: action.component,
      };
    }

    case HIDE_MODAL: {
      return {
        ...state,
        showModal: false,
      };
    }

    case SET_CALL_OPTION: {
      return {
        ...state,
        callOption: true,
      };
    }

    case SET_REMOVE_HALF_ANSWER_OPTION: {
      return {
        ...state,
        removeHalfAnsOption: {
          touched: true,
          flag: false,
        },
      };
    }

    case CLEAR_REMOVE_HALF_ANSWER_OPTION: {
      return {
        ...state,
        removeHalfAnsOption: {
          touched: true,
          flag: true,
        },
      };
    }

    case SET_AUDIENCE_ANSWER_OPTION: {
      return {
        ...state,
        audienceAnsOption: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

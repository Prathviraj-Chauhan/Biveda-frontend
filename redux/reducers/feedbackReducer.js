import { feedbackTypes } from "../types";

const initialState = {};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case feedbackTypes.SET_ADD_FEEDBACK:
      return {
        ...state,
        addFeedback: action.payload,
      };
    case feedbackTypes.SET_FEEDBACK_LIST:
      return {
        ...state,
        feedbackList: action.payload,
      };
    case feedbackTypes.SET_APPLY_FEEDBACK:
      return {
        ...state,
        applyFeedback: action.payload,
      };
    case feedbackTypes.SET_REPLY_FEEDBACK_MESSAGE:
      return {
        ...state,
        replyFeedbackMessage: action.payload,
      };
    default:
      return state;
  }
};

export default feedbackReducer;

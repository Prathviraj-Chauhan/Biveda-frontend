import axiosInstance from "../axiosInstance";
import { feedbackTypes } from "../types";
import { setPageLoading } from "./authActions";

let token;
try {
  token = localStorage.getItem("accessToken");
} catch (err) {
  token = "default value";
}

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getFeedbackList =
  (customerId, healthexpertId) => async (dispatch) => {
    dispatch(setPageLoading(true));
    await axiosInstance
      .get(`/auth/feedbackMessageFind/${customerId}/${healthexpertId}`, config)
      .then((res) => {
        dispatch(setPageLoading(false));
        if (res.data.success) {
          dispatch({
            type: feedbackTypes.SET_FEEDBACK_LIST,
            payload: res.data.data,
          });
        }
      })
      .catch((err) => {
        dispatch(setPageLoading(false));
      });
  };

export const onAddFeedback = (data, setPopup) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post(`/product/addFeedback`, data, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: feedbackTypes.SET_ADD_FEEDBACK,
          payload: res.data,
        });
        setPopup();
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const onApplyFeedbackMessage = (data) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post(`/auth/feedbackMessage`, data, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: feedbackTypes.SET_APPLY_FEEDBACK,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const onReplyFeedbackMessage = (messageID, data) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .patch(`/auth/feedbackMessageReply/${messageID}`, data, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: feedbackTypes.SET_REPLY_FEEDBACK_MESSAGE,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

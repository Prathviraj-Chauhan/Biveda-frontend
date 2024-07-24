import axiosInstance from "../axiosInstance";
import { orderTypes } from "../types";
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

export const setOrderId = (data) => (dispatch) => {
  dispatch({
    type: orderTypes.SET_ORDER_ID,
    payload: data,
  });

  localStorage.setItem("order_id", data);
};

export const getOrderList = (id) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/product/getOrderList/${id}`, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: orderTypes.SET_ORDER_LIST,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getOrderDetails = (id) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/product/getOrderById/${id}`, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: orderTypes.SET_ORDER_DETAILS,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const onOrderCancel = (id) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post(`/product/cancelOrder/${id}`, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: orderTypes.SET_ORDER_CANCEL,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

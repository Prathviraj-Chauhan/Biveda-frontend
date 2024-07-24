import axiosInstance from "../axiosInstance";
import { userTypes } from "../types";
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

export const getUserDetails = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get("/auth/userDetails", config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: userTypes.SET_USER_DETAILS,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const updateUserDetails = (id, data) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .patch(`/auth/updateUserProfile/${id}`, data, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: userTypes.SET_UPDATE_USER_DETAILS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const updateUserAddress =
  (id, searchParams, data, handleChangeTab) => async (dispatch) => {
    dispatch(setPageLoading(true));
    await axiosInstance
      .patch(`/admin/updatedUserAddress/${id}?${searchParams}`, data, config)
      .then((res) => {
        dispatch(setPageLoading(false));
        if (res.data.success) {
          if (handleChangeTab) {
            handleChangeTab("information");
          }
          dispatch({
            type: userTypes.SET_UPDATE_USER_ADDRESS,
            payload: res.data,
          });
          localStorage.removeItem("address_details");
        }
      })
      .catch((err) => {
        dispatch(setPageLoading(false));
      });
  };

export const setAddressDetails = (data) => (dispatch) => {
  dispatch({
    type: userTypes.SET_ADDRESS_DETAILS,
    payload: data,
  });

  localStorage.setItem("address_details", JSON.stringify(data));
};

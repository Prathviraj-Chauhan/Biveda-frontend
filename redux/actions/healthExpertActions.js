import axiosInstance from "../axiosInstance";
import { healthExpertTypes } from "../types";
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

export const getCategoryList = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get("/auth/getUserCategory")
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: healthExpertTypes.SET_CATEGORY_LIST,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getSubCategoryList = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get("/auth/getUserSubCategory")
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: healthExpertTypes.SET_SUB_CATEGORY_LIST,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getPatientList = (searchParmas) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/auth/getAllCustomerExpertList?${searchParmas}`)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: healthExpertTypes.SET_PATIENT_LIST,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const setPatientId = (data) => (dispatch) => {
  dispatch({
    type: healthExpertTypes.SET_PATIENT_ID,
    payload: data,
  });

  localStorage.setItem("patient_id", data);
};

export const getPatientDetails = (id) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/auth/getSingleUserData/${id}`)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: healthExpertTypes.SET_PATIENT_DETAILS,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const onAddDietPlan = (data, setPopup) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post(`/admin/addDeit`, data, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: healthExpertTypes.SET_ADD_DIET_PLAN,
          payload: res.data.data,
        });
      }
      setPopup();
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getDeitListByUser = (userId) => async (dispatch) => {
  await axiosInstance
    .get(`/admin/getDeitByUser/${userId}`, config)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: healthExpertTypes.SET_DIET_LIST_BY_USER,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

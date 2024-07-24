import axiosInstance from "../axiosInstance";
import { homeTypes } from "../types";
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

export const getShopByCategoryList = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get("/admin/getShopByCategory")
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: homeTypes.SET_SHOP_BY_CATEGORY_LIST,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getShopByCategoryId = (id) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/admin/getShopByCategoryById/${id}`)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: homeTypes.SET_SHOP_CATEGORY_DETAILS,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getSiteSettingData = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/admin/getSetting`)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: homeTypes.SET_SITE_SETTING_DATA,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getProductCategoryList = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/admin/getProductCategory`)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: homeTypes.SET_PRODUCT_CATEGORY,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getAboutUsData = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get("/admin/getAbout")
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: homeTypes.SET_ABOUT_DATA,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getConsultationDetails = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get("/admin/getFit", config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: homeTypes.SET_CONSULTATION_DETAILS,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getTermsAndCondition = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get("/admin/getPages", config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: homeTypes.SET_TERMS_AND_CONDITION,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

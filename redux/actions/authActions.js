import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import { authTypes } from "../types";

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

export const setpageLoading = (data) => (dispatch) => {
  dispatch({
    type: authTypes.SET_BTN_LOADING,
    payload: data,
  });
};

export const setPageLoading = (data) => (dispatch) => {
  dispatch({
    type: authTypes.SET_PAGE_LOADING,
    payload: data,
  });
};

export const handleDarkTheme = (data) => (dispatch) => {
  dispatch({
    type: authTypes.SET_DARK_THEME,
    payload: data,
  });
};

export const setTokenInLocalStorage =
  (accessToken, refreshToken) => (dispatch) => {
    dispatch({
      type: authTypes.SET_TOKEN_IN_LOCALSTORAGE,
      payload: accessToken,
    });
    dispatch({
      type: authTypes.SET_REFRESH_TOKEN_IN_LOCALSTORAGE,
      payload: refreshToken,
    });

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

export const onLogin = (data, router) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post("/auth/login", data)
    .then((res) => {
      dispatch(setPageLoading(false));

      if (res.data.success) {
        if (res.data.role === "Customer") {
          router.push(`/dashboard/my-orders`);
        } else if (res.data.role === "HealthExpert") {
          router.push(`/dashboard/expert`);
        }
        toast.success(res.data.message);
        dispatch(
          setTokenInLocalStorage(res.data.accessToken, res.data.refreshToken)
        );
      }
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
      dispatch(setPageLoading(false));
    });
};

export const onRefreshToken = (data) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post("/auth/refresh-token", data)
    .then((res) => {
      dispatch(setPageLoading(false));
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
      toast.error(err?.response?.data?.message);
    });
};

export const onRegister = (data) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post("/auth/register", data)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        toast.success(res.data.message);
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
      toast.error(err?.response?.data?.message);
    });
};

export const onVerifyRegister = (token, data, router) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post(`/auth/verifyEmail/${token}`, data)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/registration");
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
      toast.error(err?.response?.data?.message);
    });
};

export const onForgotPassword = (data, router) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post("/auth/forgot-password", data)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/registration");
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
      toast.error(err?.response?.data?.message);
    });
};

export const onVerifyOtp = (data, router) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post("/auth/verify-otp", data)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        toast.success(res.data.message);
        router.push(`/change-password/?token=${res.data.data}`);
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
      toast.error(err?.response?.data?.message);
    });
};

export const onChangeForgotPassword = (data, router) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post("/auth/changeForgotPassword", data)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/registration");
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
      toast.error(err?.response?.data?.message);
    });
};

export const onSendContactUs = (data) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post("/auth/sendContactUs", data)
    .then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setPageLoading(false));
      }
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
      dispatch(setPageLoading(false));
    });
};

export const onChangePassword = (data, setPopup) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post("/auth/changePassword", data, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        toast.success(res.data.message);
        setPopup();
      }
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
      dispatch(setPageLoading(false));
    });
};

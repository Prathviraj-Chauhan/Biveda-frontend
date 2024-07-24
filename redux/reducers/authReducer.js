import { authTypes } from "../types";

let userTokenFromLocalstorage;
try {
  userTokenFromLocalstorage = localStorage.getItem("accessToken");
} catch (err) {
  userTokenFromLocalstorage = "default value";
}

const initialState = {
  btnLoading: false,
  pageLoading: false,
  isDarkTheme: "dark",
  isAuthenticated: userTokenFromLocalstorage,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SET_BTN_LOADING:
      return {
        ...state,
        btnLoading: action.payload,
      };
    case authTypes.SET_PAGE_LOADING:
      return {
        ...state,
        pageLoading: action.payload,
      };
    case authTypes.SET_DARK_THEME:
      return {
        ...state,
        isDarkTheme: action.payload,
      };
    case authTypes.SET_TOKEN_IN_LOCALSTORAGE:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case authTypes.SET_CONTACT_US:
      return {
        ...state,
        sendContactUs: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;

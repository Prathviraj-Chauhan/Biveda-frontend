import { homeTypes } from "../types";

const initialState = {};

const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case homeTypes.SET_SHOP_BY_CATEGORY_LIST:
      return {
        ...state,
        shopByCategoryList: action.payload,
      };
    case homeTypes.SET_ABOUT_DATA:
      return {
        ...state,
        aboutUsData: action.payload,
      };
    case homeTypes.SET_CONSULTATION_DETAILS:
      return {
        ...state,
        consultationDetails: action.payload,
      };
    case homeTypes.SET_TERMS_AND_CONDITION:
      return {
        ...state,
        termsAndCondition: action.payload,
      };
    case homeTypes.SET_SHOP_CATEGORY_DETAILS:
      return {
        ...state,
        shopCategoryDetails: action.payload,
      };
    case homeTypes.SET_PRODUCT_CATEGORY:
      return {
        ...state,
        productCategoryList: action.payload,
      };
    case homeTypes.SET_SITE_SETTING_DATA:
      return {
        ...state,
        siteSettingData: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducers;

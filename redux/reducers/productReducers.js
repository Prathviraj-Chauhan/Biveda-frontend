import { productTypes } from "../types";

let buyNowProductFromSessionStorage;
try {
  buyNowProductFromSessionStorage = JSON.parse(
    sessionStorage.getItem("buyNowProductDetails")
  );
} catch (err) {
  buyNowProductFromSessionStorage = "default value";
}

const initialState = {
  buyNowProductDetails: buyNowProductFromSessionStorage,
  productFilterValues: {
    category_id: "",
    page: 1,
    stock: "",
    min_price: "",
    max_price: 0,
  },
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    case productTypes.SET_PRODUCT_FILTER_VALUES:
      return {
        ...state,
        productFilterValues: action.payload,
      };
    case productTypes.SET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
      };
    case productTypes.SET_ADD_TO_CART:
      return {
        ...state,
        addToCart: action.payload,
      };
    case productTypes.SET_ATTIBUTE_LIST:
      return {
        ...state,
        attiributeList: action.payload,
      };
    case productTypes.SET_CART_LIST:
      return {
        ...state,
        cartList: action.payload,
      };
    case productTypes.SET_CART_LIST_DETAILS:
      return {
        ...state,
        cartListDetails: action.payload,
      };
    case productTypes.SET_REMOVE_CART:
      return {
        ...state,
        removeCart: action.payload,
      };
    case productTypes.SET_BLOG_LIST:
      return {
        ...state,
        blogList: action.payload,
      };
    case productTypes.SET_BLOG_DETAILS:
      return {
        ...state,
        blogDetails: action.payload,
      };
    case productTypes.SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    case productTypes.SET_ADD_WISHLIST:
      return {
        ...state,
        addWishlist: action.payload,
      };
    case productTypes.SET_REMOVE_WISHLIST:
      return {
        ...state,
        removeWishlist: action.payload,
      };
    case productTypes.SET_ORDER_CHECKOUT:
      return {
        ...state,
        orderCheckout: action.payload,
      };
    case productTypes.SET_BUY_NOW_PRODUCT_DETAILS:
      return {
        ...state,
        buyNowProductDetails: action.payload,
      };
    default:
      return state;
  }
};

export default productReducers;

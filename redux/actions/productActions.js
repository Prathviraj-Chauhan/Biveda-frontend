import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import { productTypes } from "../types";
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

export const getProductList = (searchParams) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/product/getProductList?${searchParams}`)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: productTypes.SET_PRODUCT_LIST,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const setProductFilterValues = (data) => (dispatch) => {
  dispatch({
    type: productTypes.SET_PRODUCT_FILTER_VALUES,
    payload: data,
  });
};

export const getProductDetails = (params) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/product/getProduct/${params}`)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: productTypes.SET_PRODUCT_DETAILS,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const onAddToCart = (data) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post(`/product/addCart`, data, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: productTypes.SET_ADD_TO_CART,
          payload: res.data,
        });
        toast.success(res.data.message);
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getCartList = (id) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/product/getCartByUser/${id}`, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch(setCartItems(res.data.data));
        dispatch(setCartListDetails(res.data));
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getAttibuteList = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/admin/getAtributte`, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: productTypes.SET_ATTIBUTE_LIST,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const setCartItems = (data) => (dispatch) => {
  dispatch({
    type: productTypes.SET_CART_LIST,
    payload: data,
  });
};
export const setCartListDetails = (data) => (dispatch) => {
  dispatch({
    type: productTypes.SET_CART_LIST_DETAILS,
    payload: data,
  });
};

export const onApplyCoupon = (data, setCouponCode) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post(`/admin/applyCoupon`, data, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        toast.success(res.data.message);
        setCouponCode("");
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
      toast.error(err?.response?.data?.message);
    });
};

export const setBuyNowProductDetails = (data, router) => (dispatch) => {
  dispatch({
    type: productTypes.SET_BUY_NOW_PRODUCT_DETAILS,
    payload: data,
  });

  sessionStorage.setItem("buyNowProductDetails", JSON.stringify(data));
  router.push("/checkout");
};

export const onCheckout = (data, router, cartList) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post(`/auth/postCheckout`, data, config)
    .then((res) => {
      if (res.data.success) {
        if (cartList?.isBuyNowProduct) {
          dispatch(buyNowCreateOrder(data, router, cartList));
        } else {
          dispatch(cartCreateOrder(data, router, cartList));
        }
        dispatch({
          type: productTypes.SET_ORDER_CHECKOUT,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
      toast.error(err?.response?.data?.message);
    });
};

export const cartCreateOrder = (data, router, cartList) => (dispatch) => {
  const orderData = {
    ids: cartList?.map((item) => item._id),
    items: cartList?.map((item) =>
      item?.product_id
        ? item?.product_id?.product_type === "Variable"
          ? {
              product_id: item.product_id,
              quantity: item.quantity,
              variation: item.variation,
            }
          : { product_id: item.product_id, quantity: item.quantity }
        : {
            shopByCategory: item.shopByCategory?._id,
            quantity: item.quantity,
          }
    ),
    user_id: data.user_id,
    delivery_type: data.deliviry_type,
    order_status: "pending",
    address: `${data.country_name}, ${data.state}, ${data.city}, ${data.street_address}, ${data.apt_suite_unit}`,
  };
  dispatch(onCreateOrder(orderData, router));
};

export const buyNowCreateOrder = (data, router, cartList) => (dispatch) => {
  const orderData = {
    items:
      cartList?.product_type === "Variable"
        ? {
            product_id: cartList?._id,
            quantity: cartList?.quantity,
            variation: cartList?.variation,
          }
        : { product_id: cartList?._id, quantity: cartList?.quantity },

    user_id: data.user_id,
    delivery_type: data.deliviry_type,
    order_status: "pending",
    address: `${data.country_name}, ${data.state}, ${data.city}, ${data.street_address}, ${data.apt_suite_unit}`,
  };
  dispatch(onCreateOrder(orderData, router));
};

export const onCreateOrder = (data, router) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post(`/product/createOrder`, data, config)
    .then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setPageLoading(false));
        sessionStorage.removeItem("buyNowProductDetails");
        router.push("/confirm-order");
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
      toast.error(err?.response?.data?.message);
    });
};

export const onDeleteCart = (id) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .delete(`/product/removeCartById/${id}`, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch({
          type: productTypes.SET_REMOVE_CART,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
      toast.error(err?.response?.data?.message);
    });
};

export const getBlogList = () => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get("/admin/getBlog")
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: productTypes.SET_BLOG_LIST,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getBlogDetails = (slug) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/admin/getBlogById/${slug}`, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: productTypes.SET_BLOG_DETAILS,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const getWishlist = (id) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .get(`/product/getWishListByUser/${id}`)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: productTypes.SET_WISHLIST,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const onAddToWishlist = (data) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .post("/product/addWishlist", data, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: productTypes.SET_ADD_WISHLIST,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

export const onRemoveFromWishlist = (id) => async (dispatch) => {
  dispatch(setPageLoading(true));
  await axiosInstance
    .delete(`/product/removeWishlist/${id}`, config)
    .then((res) => {
      dispatch(setPageLoading(false));
      if (res.data.success) {
        dispatch({
          type: productTypes.SET_ADD_WISHLIST,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(setPageLoading(false));
    });
};

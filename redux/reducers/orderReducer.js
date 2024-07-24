import { orderTypes } from "../types";

let orderIdFromLocalStorage;
try {
  orderIdFromLocalStorage = localStorage.getItem("order_id");
} catch (err) {
  orderIdFromLocalStorage = "default value";
}

const initialState = {
  orderId: orderIdFromLocalStorage,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderTypes.SET_ORDER_LIST:
      return {
        ...state,
        orderList: action.payload,
      };
    case orderTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case orderTypes.SET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
      };
    case orderTypes.SET_ORDER_CANCEL:
      return {
        ...state,
        orderCancel: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;

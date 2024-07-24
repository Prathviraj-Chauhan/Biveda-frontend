import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import homeReducers from "./reducers/homeReducers";
import productReducers from "./reducers/productReducers";
import orderReducer from "./reducers/orderReducer";
import userReducers from "./reducers/userReducers";
import healthExpertReducer from "./reducers/healthExpertReducer";
import feedbackReducer from "./reducers/feedbackReducer";

let middleware = [thunk];

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducers,
  product: productReducers,
  order: orderReducer,
  user: userReducers,
  healthExpert: healthExpertReducer,
  feedback: feedbackReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

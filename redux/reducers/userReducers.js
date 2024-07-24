import { userTypes } from "../types";

let addressDetailsFromLocalstorage;
try {
  addressDetailsFromLocalstorage = JSON.parse(
    localStorage.getItem("address_details")
  );
} catch (err) {
  addressDetailsFromLocalstorage = "default value";
}

const initialState = {
  addressDetails: addressDetailsFromLocalstorage,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case userTypes.SET_UPDATE_USER_DETAILS:
      return {
        ...state,
        updateUserDetails: action.payload,
      };
    case userTypes.SET_UPDATE_USER_ADDRESS:
      return {
        ...state,
        updateUserAddress: action.payload,
      };
    case userTypes.SET_ADDRESS_DETAILS:
      return {
        ...state,
        addressDetails: action.payload,
      };

    default:
      return state;
  }
};

export default userReducers;

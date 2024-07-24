import { healthExpertTypes } from "../types";

let patientIdFromLocalStorage;
try {
  patientIdFromLocalStorage = localStorage.getItem("patient_id");
} catch (err) {
  patientIdFromLocalStorage = "default value";
}

const initialState = {
  patientId: patientIdFromLocalStorage,
};

const healthExpertReducer = (state = initialState, action) => {
  switch (action.type) {
    case healthExpertTypes.SET_CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.payload,
      };
    case healthExpertTypes.SET_SUB_CATEGORY_LIST:
      return {
        ...state,
        subCategoryList: action.payload,
      };
    case healthExpertTypes.SET_PATIENT_LIST:
      return {
        ...state,
        patientList: action.payload,
      };
    case healthExpertTypes.SET_PATIENT_ID:
      return {
        ...state,
        patientId: action.payload,
      };
    case healthExpertTypes.SET_PATIENT_DETAILS:
      return {
        ...state,
        patientDetails: action.payload,
      };
    case healthExpertTypes.SET_ADD_DIET_PLAN:
      return {
        ...state,
        addDietPlan: action.payload,
      };
    case healthExpertTypes.SET_DIET_LIST_BY_USER:
      return {
        ...state,
        dietPlanList: action.payload,
      };

    default:
      return state;
  }
};

export default healthExpertReducer;

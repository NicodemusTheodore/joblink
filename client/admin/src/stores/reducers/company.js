import {
  FETCH_COMPANY,
  FETCH_COMPANY_BY_ID,
  FETCH_COMPANY_LOADING,
} from "../actions/actionType";

const initialState = {
  companies: [],
  company: {},
  isCompanyFetchingLoading: false,
};

function companyReducer(state = initialState, action) {
  if (action.type === FETCH_COMPANY) {
    return {
      ...state,
      companies: action.payload,
    };
  } else if (action.type === FETCH_COMPANY_BY_ID) {
    return {
      ...state,
      company: action.payload,
    };
  } else if (action.type === FETCH_COMPANY_LOADING) {
    return {
      ...state,
      isCompanyFetchingLoading: action.payload,
    };
  }

  return state;
}

export default companyReducer;

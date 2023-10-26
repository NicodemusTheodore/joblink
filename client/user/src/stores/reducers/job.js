import {
  FETCH_JOB,
  FETCH_JOB_BY_ID,
  FETCH_JOB_LOADING,
} from "../actions/actionType";

const initialState = {
  jobs: [],
  job: {},
  isJobFetchingLoading: false,
};

function jobReducer(state = initialState, action) {
  if (action.type === FETCH_JOB) {
    return {
      ...state,
      jobs: action.payload,
    };
  } else if (action.type === FETCH_JOB_BY_ID) {
    return {
      ...state,
      job: action.payload,
    };
  } else if (action.type === FETCH_JOB_LOADING) {
    return {
      ...state,
      isJobFetchingLoading: action.payload,
    };
  }

  return state;
}

export default jobReducer;

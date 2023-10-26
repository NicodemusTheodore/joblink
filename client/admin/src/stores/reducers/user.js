import { FETCH_USER, FETCH_USER_LOADING } from "../actions/actionType";

const initialState = {
  users: [],
  isUserFetchingLoading: false,
};

function userReducer(state = initialState, action) {
  if (action.type === FETCH_USER) {
    return {
      ...state,
      users: action.payload,
    };
  } else if (action.type === FETCH_USER_LOADING) {
    return {
      ...state,
      isUserFetchingLoading: action.payload,
    };
  }

  return state;
}

export default userReducer;

import { combineReducers } from "redux";
import userReducer from "./user";
import companyReducer from "./company";
import jobReducer from "./job";

const rootReducer = combineReducers({
  users: userReducer,
  jobs: jobReducer,
  companies: companyReducer,
});

export default rootReducer;

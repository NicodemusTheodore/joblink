import { combineReducers } from "redux";
import jobReducer from "./job";

const rootReducer = combineReducers({
  jobs: jobReducer,
});

export default rootReducer;

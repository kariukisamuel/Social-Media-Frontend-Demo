import { combineReducers } from "redux";
import comments from "./commentsReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  comments,
  user,
});

export default rootReducer;

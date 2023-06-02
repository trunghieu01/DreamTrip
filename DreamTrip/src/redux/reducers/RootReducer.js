import UserReducer from "./UserReducer";
import InteractiveReducer from "./InteractiveReducer";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
  user: UserReducer,
  interact: InteractiveReducer
});

export default RootReducer;
import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import layout from "./layout";
import media from "./media";
import content from "./content";

export default combineReducers({
  alert,
  auth,
  layout,
  media,
  content,
});

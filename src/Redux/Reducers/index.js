import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import orgReducer from "./OrgReducer";
import userReducer from "./UserReducer";
import certReducer from "./CertificateReducer";
import fontReducer from "./FontReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  org: orgReducer,
  user: userReducer,
  cert: certReducer,
  font: fontReducer,
});
export default rootReducer;

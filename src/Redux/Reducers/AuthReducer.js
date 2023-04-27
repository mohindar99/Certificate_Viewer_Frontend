import { authConstants } from "../Actions/constants";

const initialState = {
  token: null,
  user: {},
  authenticate: false,
  authenticating: false,
  loading: false,
  error: "",
  message: "",
  messageAdmin: "",
  data: {},
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
        loading: true,
      }
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        token: action.payload.sessionId,
        authenticate: true,
        authenticating: false,
        loading: false,
        message: action.payload.message,
      }
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        message: action.payload.message,
      }
    case authConstants.FORGOT_PASS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case authConstants.FORGOT_PASS_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
        error: action.payload.error,
      }
    case authConstants.FORGOT_PASS_FAILURE:
      return {
        loading: false,
        message: action.payload.message,
        error: action.payload.error,
      }
    case authConstants.RESET_PASS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case authConstants.RESET_PASS_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
        error: action.payload.error,
      }
    case authConstants.RESET_PASS_FAILURE:
      return {
        loading: false,
        message: action.payload.message,
        error: action.payload.error,
      };
    case authConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstants.UPDATE_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
        error: action.payload.error,
      };
    case authConstants.UPDATE_FAILURE:
      return {
        loading: false,
        message: action.payload.message,
        error: action.payload.error,
      };
    case authConstants.GET_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case authConstants.GET_ADMIN_SUCCESS:
      return {
        loading: false,
        messageAdmin: action.payload.message,
        user: action.payload.data,
      }
    case authConstants.GET_ADMIN_FAILURE:
      return {
        loading: false,
        error: action.payload.message,
      }
    case authConstants.GET_DASHBOARD_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case authConstants.GET_DASHBOARD_DETAIL_SUCCESS:
      return {
        loading: false,
        messageAdmin: action.payload.message,
        data: action.payload.data,
      }
    case authConstants.GET_DASHBOARD_DETAIL_FAILUE:
      return {
        loading: false,
        error: action.payload.message,
      }
    case authConstants.RESET_STATE:
      return {
        ...state,
        message: "",
        error: "",
      }
    default:
      return state
  }
};
export default AuthReducer;

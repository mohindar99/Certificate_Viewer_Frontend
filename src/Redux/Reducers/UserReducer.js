import { userConstants } from "../Actions/constants";

const initialState = {
  user: {},
  users: [],
  loading: false,
  error: "",
  message: "",
  messageUser: "",
  listMessage: "",
  paginationData: {},
};


const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_CREATE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_CREATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        user: action.payload.data,
      };
      break;
    case userConstants.USER_CREATE_FAILUE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.USER_GET_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_GET_SUCCESS:
      state = {
        ...state,
        loading: false,
        listMessage: action.payload.message,
        users: action.payload.data,
        paginationData: action.payload.paginationData,
      };
      break;
    case userConstants.USER_GET_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.USER_DELETE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_RESEND_EMAIL:
      state = {
        ...state,
        loading: true,
      }
      break;
    case userConstants.USER_DELETE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_RESEND_EMAIL_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      }
      break;
    case userConstants.USER_DELETE_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.USER_RESEND_EMAIL_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.USER_UPDATE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_UPDATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_UPDATE_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.USER_UPLOAD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_UPLOAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_UPLOAD_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.USER_LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_LOGIN_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.USER_DETAIL_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_DETAIL__SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        user: action.payload.data,
      };
      break;
    case userConstants.USER_DETAIL_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.USER_ADMIN_DETAILS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_ADMIN_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        messageUser: action.payload.message,
        user: action.payload.data,
      };
      break;
    case userConstants.USER_ADMIN_DETAILS_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.RESET_STATE:
      state = {
        ...state,
        message: "",
        error: "",
      };
      break;
    default:
      break;
  }
  return state;
};
export default UserReducer;

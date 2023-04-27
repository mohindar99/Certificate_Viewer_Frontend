import { orgConstants } from "../Actions/constants";

const initialState = {
  org: {},
  orgs: [],
  users: [],
  certificates: [],
  loading: false,
  error: "",
  message: "",
  listMessage: "",
  userMessage: "",
  certMessage: "",
  paginationData: {},
  userPaginationData: {},
  certPaginationData: {},
};
const OrgReducer = (state = initialState, action) => {
  switch (action.type) {
    case orgConstants.ORG_ADD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orgConstants.ORG_ADD_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        org: action.payload.data,
      };
      break;
    case orgConstants.ORG_ADD_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case orgConstants.ORG_GET_ALL_REQUEST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case orgConstants.ORG_GET_ALL_SUCCESS:
      state = {
        ...state,
        loading: false,
        listMessage: action.payload.message,
        orgs: action.payload.data,
        paginationData: action.payload.paginationData,
      };
      break;
    case orgConstants.ORG_GET_ALL_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case orgConstants.ORG_USER_LIST_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orgConstants.ORG_USER_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        userMessage: action.payload.message,
        users: action.payload.data,
        userPaginationData: action.payload.paginationData,
      };
      break;
    case orgConstants.ORG_USER_LIST_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case orgConstants.ORG_CERT_LIST_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orgConstants.ORG_CERT_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        certMessage: action.payload.message,
        certificates: action.payload.data,
        certPaginationData: action.payload.paginationData,
      };
      break;
    case orgConstants.ORG_CERT_LIST_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case orgConstants.ORG_DELETE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orgConstants.ORG_DELETE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };

      break;
    case orgConstants.ORG_DELETE_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case orgConstants.ORG_UPDATE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orgConstants.ORG_UPDATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };

      break;
    case orgConstants.ORG_UPDATE_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case orgConstants.RESET_STATE:
      state = {
        ...state,
        loading: false,
        message: "",
        error:"",
      };
      break;
    default:
      state = {
        ...state,
      };
      break;
  }
  return state;
};
export default OrgReducer;

import { certificateConstants } from "../Actions/constants";

const initialState = {
  certificate: {},
  certificates: [],
  loading: false,
  error: "",
  message: "",
  listMessage: "",
  paginationData: {},
  requestsList: [],
  requests: [],
  data: {},
};
const CertificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case certificateConstants.CERTIFICATE_CREATE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case certificateConstants.CERTIFICATE_CREATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        certificate: action.payload.data,
      };
      break;
    case certificateConstants.CERTIFICATE_CREATE_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case certificateConstants.CERTIFICATE_GET_ALL_REQUEST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case certificateConstants.CERTIFICATE_GET_ALL_SUCCESS:
      state = {
        ...state,
        loading: false,
        listMessage: action.payload.message,
        certificates: action.payload.data,
        paginationData: action.payload.paginationData,
      };
      break;
    case certificateConstants.CERTIFICATE_GET_ALL_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case certificateConstants.CERTIFICATE_DELETE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case certificateConstants.CERTIFICATE_DELETE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case certificateConstants.CERTIFICATE_DELETE_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case certificateConstants.CERTIFICATE_EDIT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case certificateConstants.CERTIFICATE_EDIT_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case certificateConstants.CERTIFICATE_EDIT_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case certificateConstants.USER_CERTIFICATE_LIST_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case certificateConstants.USER_CERTIFICATE_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        listMessage: action.payload.message,
        certificates: action.payload.data,
        paginationData: action.payload.paginationData,
      };
      break;
    case certificateConstants.USER_CERTIFICATE_LIST_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case certificateConstants.CREATE_REQUEST_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case certificateConstants.CREATE_REQUEST_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        data: action.payload.data,
      };
      break;
    case certificateConstants.CREATE_REQUEST_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case certificateConstants.REQUEST_LIST_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case certificateConstants.REQUEST_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        listMessage: action.payload.message,
        requestsList: action.payload.data,
        paginationData: action.payload.paginationData,
      };
      break;
    case certificateConstants.REQUEST_LIST_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case certificateConstants.STATUS_CHANGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case certificateConstants.STATUS_CHANGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        data: action.payload.data,
      };

      break;
    case certificateConstants.STATUS_CHANGE_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case certificateConstants.RESET_STATE:
      state = {
        ...state,
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
export default CertificateReducer;

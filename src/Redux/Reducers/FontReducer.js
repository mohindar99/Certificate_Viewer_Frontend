import { fontConstants } from "../Actions/constants";

const initialState = {
  data: {},
  loading: false,
  error: "",
  fontList: [],
  message: "",
  listMessage: "",
  paginationData: {},
};
const FontReducer = (state = initialState, action) => {
  switch (action.type) {
    case fontConstants.CREATE_FONT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case fontConstants.CREATE_FONT_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        data: action.payload.data,
      };
      break;
    case fontConstants.CREATE_FONT_FAILUE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case fontConstants.FONT_LIST_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case fontConstants.FONT_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        listMessage: action.payload.message,
        fontList: action.payload.data,
        paginationData: action.payload.paginationData,
      };
      break;
    case fontConstants.FONT_LIST_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case fontConstants.FONT_DELETE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case fontConstants.FONT_DELETE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        data: action.payload.data,
      };
      break;
    case fontConstants.FONT_DELETE_FAILURE:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case fontConstants.RESET_STATE:
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
export default FontReducer;

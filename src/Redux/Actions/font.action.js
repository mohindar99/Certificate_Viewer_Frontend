import { fontConstants } from "./constants";
import axios from "../../Utililties/axios";
import { BaseUrl } from "../../Utililties/Config";

export const createFont = (data) => {
  return async (dispatch) => {
    dispatch({
      type: fontConstants.CREATE_FONT_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}font-master/add`, { ...data });

    if (res.data.statusCode === 200) {
      const { data, message } = res.data;

      dispatch({
        type: fontConstants.CREATE_FONT_SUCCESS,
        payload: {
          message: message,
          data: data,
        },
      });
      dispatch(fontList({ pageNo: 1, limit: 5 }));
    } else {
      const { message } = res.data;

      dispatch({
        type: fontConstants.CREATE_FONT_FAILUE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: fontConstants.RESET_STATE,
      });
    }
  };
};

export const fontList = (data) => {
  return async (dispatch) => {
    dispatch({
      type: fontConstants.FONT_LIST_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}font-master/list`, { ...data });

    if (res.data.statusCode === 200) {
      const { data, message, paginationData } = res.data;

      dispatch({
        type: fontConstants.FONT_LIST_SUCCESS,
        payload: {
          message: message,
          data: data,
          paginationData: paginationData,
        },
      });
      dispatch({
        type: fontConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: fontConstants.FONT_LIST_FAILURE,
        payload: {
          error: message,
        },
      });

      dispatch({
        type: fontConstants.RESET_STATE,
      });
    }
  };
};

export const fontDelete = (id) => {
  return async (dispatch) => {
    dispatch({
      type: fontConstants.FONT_DELETE_REQUEST,
    });
    const res = await axios.delete(`${BaseUrl}font-master/delete?id=${id}`);

    if (res.data.statusCode === 200) {
      const { data, message } = res.data;

      dispatch({
        type: fontConstants.FONT_DELETE_SUCCESS,
        payload: {
          message: message,
          data: data,
        },
      });
      dispatch(fontList({ pageNo: 1, limit: 5 }));
      dispatch({
        type: fontConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: fontConstants.FONT_DELETE_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: fontConstants.RESET_STATE,
      });
    }
  };
};
export const ResetFont =()=> {
  return async (dispatch) => {
    dispatch({ type: fontConstants.RESET_STATE })
  }
}

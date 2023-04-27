import { orgConstants } from "./constants";
import axios from "../../Utililties/axios";
import { BaseUrl } from "../../Utililties/Config";

export const AddOrg = (data) => {
  return async (dispatch) => {
    dispatch({
      type: orgConstants.ORG_ADD_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}org/add`, { ...data });

    if (res.data.statusCode === 200) {
      const { data, message } = res.data;

      dispatch({
        type: orgConstants.ORG_ADD_SUCCESS,
        payload: {
          message: message,
          data: data,
        },
      });
      dispatch(allOrg({ pageNo: 1, limit: 5, searchKey: null }));
      dispatch({
        type: orgConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;
      dispatch({
        type: orgConstants.ORG_ADD_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: orgConstants.RESET_STATE,
      });
    }
  };
};
export const allOrg = (data) => {
  return async (dispatch) => {
    dispatch({
      type: orgConstants.ORG_GET_ALL_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}org/list`, { ...data });

    if (res.data.statusCode === 200) {
      const { data, message, paginationData } = res.data;
      dispatch({
        type: orgConstants.ORG_GET_ALL_SUCCESS,
        payload: {
          message: message,
          data: data,
          paginationData,
        },
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: orgConstants.ORG_GET_ALL_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: orgConstants.RESET_STATE,
      });
    }
  };
};

export const certificateList = (data) => {
  return async (dispatch) => {
    dispatch({
      type: orgConstants.ORG_CERT_LIST_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}org/org-cert-list`, { ...data });

    if (res.data.statusCode === 200) {
      const { data, message, paginationData } = res.data;

      dispatch({
        type: orgConstants.ORG_CERT_LIST_SUCCESS,
        payload: {
          message: message,
          data: data,
          paginationData,
        },
      });
      dispatch({
        type: orgConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: orgConstants.ORG_CERT_LIST_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: orgConstants.RESET_STATE,
      });
    }
  };
};
export const userList = (data) => {
  return async (dispatch) => {
    dispatch({
      type: orgConstants.ORG_USER_LIST_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}org/org-user-list`, { ...data });

    if (res.data.statusCode === 200) {
      const { data, message, paginationData } = res.data;

      dispatch({
        type: orgConstants.ORG_USER_LIST_SUCCESS,
        payload: {
          message: message,
          data: data,
          paginationData,
        },
      });
      dispatch({
        type: orgConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: orgConstants.ORG_USER_LIST_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: orgConstants.RESET_STATE,
      });
    }
  };
};
export const deleteOrg = (data) => {
  return async (dispatch) => {
    dispatch({
      type: orgConstants.ORG_DELETE_REQUEST,
    });
    const res = await axios.delete(`${BaseUrl}org/delete`, {
      data: { id: data.id },
    });

    if (res.data.statusCode === 200) {
      const { message } = res.data;

      dispatch({
        type: orgConstants.ORG_DELETE_SUCCESS,
        payload: {
          message: message,
        },
      });
      dispatch(allOrg({ pageNo: 1, limit: 5, search: null }));
      dispatch({
        type: orgConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: orgConstants.ORG_DELETE_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: orgConstants.RESET_STATE,
      });
    }
  };
};
export const updateOrg = (data) => {
  return async (dispatch) => {
    dispatch({
      type: orgConstants.ORG_UPDATE_REQUEST,
    });
    const res = await axios.put(`${BaseUrl}org/update?id=${data.id}`, {
      ...data,
    });

    if (res.data.statusCode === 200) {
      const { message } = res.data;
      dispatch({
        type: orgConstants.ORG_UPDATE_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      dispatch({
        type: orgConstants.ORG_UPDATE_FAILURE,
        payload: {
          message: res.data.message,
        },
      });
      dispatch({
        type: orgConstants.RESET_STATE,
      });
    }
  };
};
export const ResetOrg =()=> {
  return async (dispatch) => {
    dispatch({ type: orgConstants.RESET_STATE })
  }
}

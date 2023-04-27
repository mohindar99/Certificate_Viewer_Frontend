import { userConstants } from "./constants";
import axios from "../../Utililties/axios";
import { BaseUrl } from "../../Utililties/Config";
// const token = localStorage.getItem("token");

export const addReci = (data) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_CREATE_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}user/add`, { ...data });

    if (res.data.statusCode === 200) {
      const { data, message } = res.data;

      dispatch({
        type: userConstants.USER_CREATE_SUCCESS,
        payload: {
          data,
          message,
        },
      });
    } else {
      dispatch({
        type: userConstants.USER_CREATE_FAILUE,
        payload: {
          error: res.data.message,
        },
      });
      dispatch({
        type: userConstants.RESET_STATE,
      });
    }
  };
};

export const getReci = (data) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_GET_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}user/list`, { ...data });

    if (res.data.statusCode === 200) {
      const { data, message, paginationData } = res.data;

      dispatch({
        type: userConstants.USER_GET_SUCCESS,
        payload: {
          message: message,
          data: data,
          paginationData,
        },
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: userConstants.USER_GET_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: userConstants.RESET_STATE,
      });
    }
  };
};
export const getReciDetails = (id) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_ADMIN_DETAILS_REQUEST,
    });
    const res = await axios.get(`${BaseUrl}admin/user-detail?id=${id}`);

    if (res.data.statusCode === 200) {
      const { data, message } = res.data;

      dispatch({
        type: userConstants.USER_ADMIN_DETAILS_SUCCESS,
        payload: {
          message: message,
          data: data,
        },
      });
      dispatch({
        type: userConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: userConstants.USER_ADMIN_DETAILS_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: userConstants.RESET_STATE,
      });
    }
  };
};
export const deleteUser = (id, certificateId) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_DELETE_REQUEST,
    });
    const res = await axios.delete(`${BaseUrl}user/delete?id=${id}`);
    if (res.data.statusCode === 200) {
      const { message } = res.data;

      dispatch({
        type: userConstants.USER_DELETE_SUCCESS,
        payload: {
          message: message,
        },
      });
      dispatch(getReci({ pageNo: 1, limit: 5, certificateId: certificateId }));
      dispatch({
        type: userConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: userConstants.USER_DELETE_FAILURE,
        payload: {
          error: message,
        },
      });
    }
  };
};

export const resendEmail = (res) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_RESEND_EMAIL,
    });
    const { message } = res.data;
    if (res.data.statusCode === 200) {
      dispatch({
        type: userConstants.USER_RESEND_EMAIL_SUCCESS,
        payload: {
          message: message,
        },
      });
    } else {
      dispatch({
        type: userConstants.USER_RESEND_EMAIL_FAILURE,
        payload: {
          error: message,
        },
      });
    }
  };
};
export const updateUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_UPDATE_REQUEST,
    });

    const res = await axios.put(`${BaseUrl}user/update?id=${data.id}`, {
      ...data,
    });

    if (res.data.statusCode === 200) {
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_UPDATE_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      dispatch({
        type: userConstants.USER_UPDATE_FAILURE,
        payload: {
          message: res.data.message,
        },
      });
      dispatch({
        type: userConstants.RESET_STATE,
      });
    }
  };
};
export const uploadUser = (data, id) => {
  const myFile = new FormData();
  const certificateId = id;
  myFile.append("myFile", data);

  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_UPLOAD_REQUEST,
    });
    const res = await axios.post(
      `${BaseUrl}user/upload-users?id=${id}`,
      myFile
    );

    if (res.data.statusCode === 200) {
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_UPLOAD_SUCCESS,
        payload: {
          message,
        },
      });
      dispatch(getReci({ pageNo: 1, limit: 5, certificateId }));
      dispatch({
        type: userConstants.RESET_STATE,
      });
    } else {
      dispatch({
        type: userConstants.USER_UPLOAD_FAILURE,
        payload: {
          message: res.data.message,
        },
      });
      dispatch(getReci({ pageNo: 1, limit: 5, certificateId }));
      dispatch({
        type: userConstants.RESET_STATE,
      });
    }
  };
};
export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_LOGIN_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}user/send-dashboard-link`, {
      ...data,
    });

    if (res.data.statusCode === 200) {
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_LOGIN_SUCCESS,
        payload: {
          message,
        },
      });
      dispatch({
        type: userConstants.RESET_STATE,
      });
    } else {
      dispatch({
        type: userConstants.USER_LOGIN_FAILURE,
        payload: {
          error: res.data.message,
        },
      });
      dispatch({
        type: userConstants.RESET_STATE,
      });
    }
  };
};
export const userDetails = () => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_DETAIL_REQUEST,
    });
    const res = await axios.get(`${BaseUrl}user/user-detail`);

    if (res.data.statusCode === 200) {
      const { message, data } = res.data;
      dispatch({
        type: userConstants.USER_DETAIL__SUCCESS,
        payload: {
          message,
          data,
        },
      });
      dispatch({
        type: userConstants.RESET_STATE,
      });
    } else {
      dispatch({
        type: userConstants.USER_DETAIL_FAILURE,
        payload: {
          error: res.data.message,
        },
      });
      dispatch({
        type: userConstants.RESET_STATE,
      });
    }
  };
};
export const ResetUser = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.RESET_STATE });
  };
};

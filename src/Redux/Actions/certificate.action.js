import { certificateConstants } from "./constants";
import axios from "../../Utililties/axios";
import { BaseUrl } from "../../Utililties/Config";

export const addCertificate = (data) => {
  return async (dispatch) => {
    dispatch({
      type: certificateConstants.CERTIFICATE_CREATE_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}certificate/create`, { ...data });

    if (res.data.statusCode === 200) {
      const { data, message } = res.data;

      dispatch({
        type: certificateConstants.CERTIFICATE_CREATE_SUCCESS,
        payload: {
          message: message,
          data: data,
        },
      });
      dispatch(allCert({ pageNo: 1, limit: 5, search: null }));
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: certificateConstants.CERTIFICATE_CREATE_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    }
  };
};
export const updateCertificate = (data, id) => {
  return async (dispatch) => {
    dispatch({
      type: certificateConstants.CERTIFICATE_EDIT_REQUEST,
    });
    const res = await axios.put(`${BaseUrl}certificate/update?certId=${id}`, {
      ...data,
    });

    if (res.data.statusCode === 200) {
      const { data, message } = res.data;

      dispatch({
        type: certificateConstants.CERTIFICATE_EDIT_SUCCESS,
        payload: {
          message: message,
          data: data,
        },
      });
      dispatch(allCert({ pageNo: 1, limit: 5, search: null }));
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: certificateConstants.CERTIFICATE_EDIT_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    }
  };
};
export const allCert = (data) => {
  return async (dispatch) => {
    dispatch({
      type: certificateConstants.CERTIFICATE_GET_ALL_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}certificate/list`, { ...data });

    if (res.data.statusCode === 200) {
      const { data, message, paginationData } = res.data;

      dispatch({
        type: certificateConstants.CERTIFICATE_GET_ALL_SUCCESS,
        payload: {
          message: message,
          data: data,
          paginationData,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: certificateConstants.CERTIFICATE_GET_ALL_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    }
  };
};
export const deleteCert = (data) => {
  return async (dispatch) => {
    dispatch({
      type: certificateConstants.CERTIFICATE_DELETE_REQUEST,
    });
    const res = await axios.delete(
      `${BaseUrl}certificate/delete?certId=${data}`
    );

    if (res.data.statusCode === 200) {
      const { message } = res.data;

      dispatch({
        type: certificateConstants.CERTIFICATE_DELETE_SUCCESS,
        payload: {
          message: message,
        },
      });
      dispatch(allCert({ pageNo: 1, limit: 5, search: null }));
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: certificateConstants.CERTIFICATE_DELETE_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    }
  };
};
export const userCerificate = (data) => {
  return async (dispatch) => {
    dispatch({
      type: certificateConstants.USER_CERTIFICATE_LIST_REQUEST,
    });
    const res = await axios.post(
      `${BaseUrl}certificate/user-certificate-list`,
      { ...data }
    );

    if (res.data.statusCode === 200) {
      const { data, message, paginationData } = res.data;

      dispatch({
        type: certificateConstants.USER_CERTIFICATE_LIST_SUCCESS,
        payload: {
          message: message,
          data: data,
          paginationData,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: certificateConstants.USER_CERTIFICATE_LIST_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    }
  };
};

export const createRequest = (data) => {
  return async (dispatch) => {
    dispatch({
      type: certificateConstants.CREATE_REQUEST_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}change-request/create`, {
      ...data,
    });

    if (res.data.statusCode === 200) {
      const { data, message } = res.data;

      dispatch({
        type: certificateConstants.CREATE_REQUEST_SUCCESS,
        payload: {
          message: message,
          data: data,
        },
      });
      dispatch(
        requestList({
          certId: data.cerfificateId,
          email: data.email,
          pageNo: 1,
          limit: 100,
        })
      );
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: certificateConstants.CREATE_REQUEST_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    }
  };
};

export const requestList = (data) => {
  return async (dispatch) => {
    dispatch({
      type: certificateConstants.REQUEST_LIST_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}change-request/list`, {
      ...data,
    });

    if (res.data.statusCode === 200) {
      const { data, message, paginationData } = res.data;

      dispatch({
        type: certificateConstants.REQUEST_LIST_SUCCESS,
        payload: {
          message: message,
          data: data,
          paginationData: paginationData,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: certificateConstants.REQUEST_LIST_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    }
  };
};
export const changeStatus = (data) => {
  return async (dispatch) => {
    dispatch({
      type: certificateConstants.STATUS_CHANGE_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}change-request/change-status`, {
      ...data,
    });

    if (res.data.statusCode === 200) {
      const { data, message } = res.data;
      dispatch({
        type: certificateConstants.STATUS_CHANGE_SUCCESS,
        payload: {
          message: message,
          data: data,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: certificateConstants.STATUS_CHANGE_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: certificateConstants.RESET_STATE,
      });
    }
  };
};
export const ResetCert =()=> {
  return async (dispatch) => {
    dispatch({ type: certificateConstants.RESET_STATE })
  }
}

import { authConstants } from "./constants";
import axios from "../../Utililties/axios";
import { BaseUrl } from "../../Utililties/Config";
const userData = JSON.parse(localStorage.getItem("user"));


export const login = (data) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}admin/login`, { ...data })

    if (res.data.statusCode === 200) {
      const { data } = res.data
      const { sessionId } = data

      localStorage.setItem("token", sessionId)
      localStorage.setItem("user", JSON.stringify(res.data.data))
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          sessionId,
          data,
        },
      })
      dispatch({
        type: authConstants.RESET_STATE,
      })
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: res.data.message,
        },
      })
      dispatch({
        type: authConstants.RESET_STATE,
      })
    }
  };
};

export const authCheck = (sessionId, {data}) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: {
        sessionId,
        data,
      },
    })
  };
};

export const forgot = (data) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.FORGOT_PASS_REQUEST,
    });
    const res = await axios.post(`${BaseUrl}admin/forgot-password`, {
      ...data,
    });

    if (res.data.statusCode === 200) {
      const { message } = res.data;

      dispatch({
        type: authConstants.FORGOT_PASS_SUCCESS,
        payload: {
          message: message,
        },
      });
    } else {
      const { message } = res.data;

      dispatch({
        type: authConstants.FORGOT_PASS_FAILURE,
        payload: {
          error: message,
        },
      });
      dispatch({
        type: authConstants.RESET_STATE,
      });
    }
  };
};

export const reset = (data) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.RESET_PASS_REQUEST,
    });
    const res = await axios.put(`${BaseUrl}admin/reset-password`, {
      ...data,
    });

    if (res.data.statusCode === 200) {
      const { message } = res.data;
      dispatch({
        type: authConstants.RESET_PASS_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      dispatch({
        type: authConstants.RESET_PASS_FAILURE,
        payload: {
          message: res.data.message,
        },
      });
      dispatch({
        type: authConstants.RESET_STATE,
      });
    }
  };
};
export const updateAdmin = (data, id) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.UPDATE_REQUEST,
    });
    const res = await axios.put(`${BaseUrl}admin/update?id=${id}`, {
      ...data,
    });

    if (res.data.statusCode === 200) {
      const { message } = res.data;
      dispatch({
        type: authConstants.UPDATE_SUCCESS,
        payload: {
          message,
        },
      });
      dispatch(getAdmin(userData._id));
      dispatch({
        type: authConstants.RESET_STATE,
      });
    } else {
      dispatch({
        type: authConstants.UPDATE_FAILURE,
        payload: {
          error: res.data.message,
        },
      });
      dispatch({
        type: authConstants.RESET_STATE,
      });
    }
  };
};
export const getDashboard = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.GET_DASHBOARD_DETAIL_REQUEST,
    });
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BaseUrl}admin/dashboard`, {
      headers: {
        authentication: `${token}`,
      },
    });

    if (res.data.statusCode === 200) {
      const { message, data } = res.data;
      dispatch({
        type: authConstants.GET_DASHBOARD_DETAIL_SUCCESS,
        payload: {
          message,
          data,
        },
      })
    } else {
      dispatch({
        type: authConstants.GET_DASHBOARD_DETAIL_FAILUE,
        payload: {
          message: res.data.message,
        },
      });
    }
  };
};

export const getAdmin = (data) => {
  return async (dispatch) => {
    dispatch({
        type: authConstants.GET_ADMIN_REQUEST,
      })
    const token = localStorage.getItem("token")
    const res = await axios.get(`${BaseUrl}admin/profile?id=${data}`, {
      ...data,
    }, {
      headers: {
        authentication: `${token}`,
      },
    });
    if (res.data.statusCode === 200) {
      const { message, data } = res.data;
      dispatch({
        type: authConstants.GET_ADMIN_SUCCESS,
        payload: {
          message,
          data,
        },
      });
    } else {
      dispatch({
        type: authConstants.GET_ADMIN_FAILURE,
        payload: {
          message: res.data.message,
        },
      });
      dispatch({
        type: authConstants.RESET_STATE,
      });
    }
  };
};

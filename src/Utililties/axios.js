import axios from "axios";
import store from "../Redux/Store";
import { BaseUrl } from "./Config";
import { authConstants } from "../Redux/Actions/constants";

const axiosIntance = axios.create({
  baseURL: BaseUrl,
  headers: {
    Authorization: localStorage.getItem("token") ? `${localStorage.getItem("token")}` : "",
  },
});

axiosIntance.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers["authentication"] = `${localStorage.getItem("token")}`;
  }
  return req;
});

axiosIntance.interceptors.response.use((res) => {
    return res;
  },
  (error) => {
    
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;

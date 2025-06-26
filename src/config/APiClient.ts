import axios from "axios";
import queryClient from "./react-query";
import { UNAUTHORIZED } from "../constant/http";
import { navigate } from "../utils/setNavigate";

const options = {
  baseURL: import.meta.env.VITE_API_BASE_URL!,
  withCredentials: true,
};

const API = axios.create(options);
export const AUTH_KEY = "AUTH_KEY";
export const SESSION_KEY = "SESSION_KEY";

const tokenRefreshClient = axios.create(options);
tokenRefreshClient.interceptors.response.use((response) => {
  return response.data;
});

// response interceptors to has 2 functions, response and error
API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === UNAUTHORIZED && data.errorCode === "TOKEN_NOT_FOUND") {
      try {
        // refresh the access token, then retry the original request
        await tokenRefreshClient.get("/auth/refresh");
        await tokenRefreshClient(config);
      } catch (error) {
        console.log(error);
        queryClient.clear();
        navigate("/sign-in", {
          state: {
            redirect: window.location.pathname,
          },
        });
        return Promise.reject({ status, ...data });
      }
    }
  }
);

export default API;

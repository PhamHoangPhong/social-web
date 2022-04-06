import axios from "axios";
import queryString from "query-string";
import decode_token from "jwt-decode";
import dayjs from "dayjs";

export const cancelTokenSource = axios.CancelToken.source();

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

let token = localStorage[process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME]
  ? localStorage[process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME]
  : "";
let refreshToken =
  localStorage[process.env.REACT_APP_LOCAL_STORAGE_REFRESHTOKEN_NAME];
axiosClient.interceptors.request.use(
  async (config) => {
    //handle jwt token

    const decodeToken = decode_token(token);
    const isExpried = dayjs.unix(decodeToken.exp).diff(dayjs()) < 1;

    if (!isExpried) return config;

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/token`,
      { refreshToken }
    );
    localStorage.setItem(
      process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME,
      response.data.tokens.accessToken
    );
    localStorage.setItem(
      process.env.REACT_APP_LOCAL_STORAGE_REFRESHTOKEN_NAME,
      response.data.tokens.refreshToken
    );
    config.headers["Authorization"] =
      "Bearer " + response.data.tokens.accessToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;

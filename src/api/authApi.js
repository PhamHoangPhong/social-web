import axios from "axios";
import axiosClient from "./axiosClient";

const authApi = {
  loginUser: (params) => {
    const url = "/auth/login";
    return axios.post(`${process.env.REACT_APP_API_URL}${url}`, params)
  },
  registerUser: (params) => {
    const url = "/auth/register";
    return axios.post(`${process.env.REACT_APP_API_URL}${url}`, params);
  },
  logoutUser: () => {
    const url = "/auth/logout";
    return axiosClient.post(url);
  },
  loadUser: () => {
      const url = '/auth';
      return axiosClient.get(url)
  },
  updateUser: (params) => {
    const url = `/users/${params.id}`
    return axiosClient.put(url, params.data)
  }
};
export default authApi;

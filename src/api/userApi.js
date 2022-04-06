import axiosClient from "./axiosClient";

const userApi = {
  getAllUsers: () => {
    const url = "/users/";
    return axiosClient.get(url);
  },
  getUserFollowings: (id) => {
    const url = `/users/followings/${id}`;
    return axiosClient.get(url);
  },
  getUserFollowers: (id) => {
    const url = `/users/followers/${id}`;
    return axiosClient.get(url);
  },
  getUserUnfollowings: () => {
    const url = `/users/unfollowings/users`;
    return axiosClient.get(url);
  },
  getUserById: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  followUser: (id) => {
    const url = `/users/${id}/follow`;
    return axiosClient.put(url);
  },
  unfollowUser: (id) => {
    const url = `/users/${id}/unfollow`;
    return axiosClient.put(url);
  },
  searchUser: (params) => {
    const url = `/users/search/username?name=${params}`;
    return axiosClient.get(url)
  }
};
export default userApi;

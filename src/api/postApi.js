import axiosClient from "./axiosClient";

const postApi = {
  createPost: (params) => {
    const url = "/posts";
    return axiosClient.post(url, params);
  },
  getPostTimeLine: (params) => {
    const url = `/posts?page=${params.page}&size=${2}`;
    return axiosClient.get(url);
  },
  getPostByUser: (params) => {
    const url = `/posts/user/${params.id}?page=${params.page}&size=${5}`;
    return axiosClient.get(url);
  },
  getSinglePost: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  updatePost: (params) => {
    const url = `/posts/${params.id}`;
    return axiosClient.put(url, { desc: params.desc });
  },
  deletePost: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.delete(url);
  },
  likePost: (id) => {
    const url = `/posts/${id}/like`;
    return axiosClient.put(url);
  },
  getComments: (params) => {
    const url = `/posts/${params.id}/comments?page=${params.page}&size=${5}`;
    return axiosClient.get(url);
  },
  commentPost: (params) => {
    const url = `/posts/${params.id}/comment`;
    return axiosClient.put(url, {comment: params.comment})
  },
  sharePost: (params) => {
    const url = `/posts/${params.id}/share`;
    return axiosClient.post(url, {desc: params.desc})
  }
};

export default postApi;

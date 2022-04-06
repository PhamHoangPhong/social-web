import axiosClient from "./axiosClient";

const uploadApi = {
    uploadSingleImage: (params) => {
        const url = '/users/upload/profile';
        return axiosClient.post(url, params)
    },
    uploadArrayImage: (params) => {
        const url = 'posts/upload/feed';
        return axiosClient.post(url, params)
    }
}

export default uploadApi
import axiosClient from "./axiosClient";

const messageApi = {
    getConversations: () => {
        const url = '/conversation'
        return axiosClient.get(url)
    },
    createConversation: (id) => {
        const url = '/conversation';
        return axiosClient.post(url, {receiverId: id})
    },
    sendMessage: (params) => {
        const url = '/message';
        return axiosClient.post(url, params)
    },
    getMessage: (id) => {
        const url = `/message/${id}`;
        return axiosClient.get(url)
    }
}

export default messageApi
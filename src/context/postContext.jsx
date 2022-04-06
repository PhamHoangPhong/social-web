import { createContext, useReducer, useState } from "react";
import postApi from "../api/postApi";
import {
  COMMENT,
  CREATE_POST,
  DELETE_POST,
  GET_COMMENT,
  GET_POST,
  GET_SINGLE_POST,
  LIKE_POST,
  SHARE_POST,
  UPDATE_POST,
} from "../reducer";
import postReducer from "../reducer/postReducer";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    postLoading: true,
    posts: [],
    shares: [],
    postSelected: null,
    comments: [],
    commentLoading: true,
  });
  const [updatePostModal, setUpdatePostModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [sharePostModal, setSharePostModal] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [notification, setNotification] = useState([])

  const createPost = async (params) => {
    try {
      const response = await postApi.createPost(params);
      if (response.success)
        dispatch({
          type: CREATE_POST,
          payload: response.newPost,
        });
    } catch (error) {
      if (error.response) return error.response;
      else return { success: false, message: error };
    }
  };
  const getPostByUser = async (params) => {
    try {
      const response = await postApi.getPostByUser(params);
      if (response.success) {
        response.posts.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        });
        dispatch({
          type: GET_POST,
          payload: { page: params.page, posts: response.posts },
        });
      }
      return response;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };
  const getPostTimeLine = async (params) => {
    try {
      const response = await postApi.getPostTimeLine(params);
      if (response.success)
        response.posts.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        });
      dispatch({
        type: GET_POST,
        payload: { page: params.page, posts: response.posts },
      });
      return response;
    } catch (error) {
      if (error.response) return error.response;
      else return { success: false, message: error };
    }
  };
  const getSinglePost = async (id) => {
    try {
      const response = await postApi.getSinglePost(id);
      if (response.success)
        dispatch({
          type: GET_SINGLE_POST,
          payload: response.post,
        });
      return response;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };
  const getComments = async (params) => {
    try {
      const response = await postApi.getComments(params);
      if (response.success) {
        dispatch({
          type: GET_COMMENT,
          payload: response.comments,
        });
      }
      return response;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };
  const commentPost = async (params) => {
    try {
      const response = await postApi.commentPost(params);
      if (response.success) {
        dispatch({
          type: COMMENT,
          payload: { id: params.id, newComment: response.newCommentReturn },
        });
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };

  const updatePost = async (params) => {
    try {
      const response = await postApi.updatePost(params);
      if (response.success)
        dispatch({
          type: UPDATE_POST,
          payload: response.updatedPost,
        });
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };
  const deletePost = async (id) => {
    try {
      const response = await postApi.deletePost(id);
      if (response.success)
        dispatch({
          type: DELETE_POST,
          payload: id,
        });
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };
  const likePost = async (id, userId) => {
    try {
      const response = await postApi.likePost(id);
      dispatch({
        type: LIKE_POST,
        payload: { idPost: id, userId },
      });
      return response
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };
  const sharePost = async (params) => {
    try {
      const response = await postApi.sharePost(params);
      if (response.success) {
        dispatch({
          type: SHARE_POST,
          payload: {
            idPost: params.id,
            sharePost: response.sharePost,
            userId: params.userId,
          },
        });
      }
      return response;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };

  const postContextData = {
    postState,
    dispatch,
    createPost,
    getPostByUser,
    getPostTimeLine,
    deletePost,
    likePost,
    updatePostModal,
    setUpdatePostModal,
    getSinglePost,
    updatePost,
    getComments,
    commentModal,
    setCommentModal,
    idPost,
    setIdPost,
    commentPost,
    sharePostModal,
    setSharePostModal,
    sharePost,
    notification, 
    setNotification
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;

import userApi from "../api/userApi";
import { createContext, useReducer } from "react";
import userReducer from "../reducer/userReducer";
import {
  GET_USER_FOLLOWINGS,
  GET_USER_FAIL,
  GET_USER_FOLLOWERS,
  GET_USER_UNFOLLOWINGS,
  GET_USER_BY_ID,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_ALL_USER,
  SEARCH_USER,
} from "../reducer";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {
    users: [],
    userFollowers: [],
    userFollowings: [],
    userUnfollowings: [],
    usersSearch: [],
    userOnline: [],
    userLoading: true,
    userSelected: null,
  });

  const getAllUsers = async () => {
    try {
      const response = await userApi.getAllUsers();
      if (response.success) {
        response.users.sort((user1, user2) => {
          return user2.followers.length - user1.followers.length;
        });
        dispatch({
          type: GET_ALL_USER,
          payload: response.users,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_USER_FAIL,
      });
    }
  };

  const getUserFollowings = async (id) => {
    try {
      const response = await userApi.getUserFollowings(id);
      if (response.success)
        dispatch({
          type: GET_USER_FOLLOWINGS,
          payload: response.userFollowings,
        });
    } catch (error) {
      dispatch({
        type: GET_USER_FAIL,
      });
    }
  };

  const getUserFollowers = async (id) => {
    try {
      const response = await userApi.getUserFollowers(id);
      if (response.success)
        dispatch({
          type: GET_USER_FOLLOWERS,
          payload: response.userFollowers,
        });
    } catch (error) {
      dispatch({
        type: GET_USER_FAIL,
      });
    }
  };

  const getUserUnfollowings = async () => {
    try {
      const response = await userApi.getUserUnfollowings();
      dispatch({
        type: GET_USER_UNFOLLOWINGS,
        payload: response.userUnfollowings,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_FAIL,
      });
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await userApi.getUserById(id);
      if (response.success)
        dispatch({
          type: GET_USER_BY_ID,
          payload: response.other,
        });
    } catch (error) {
      dispatch({
        type: GET_USER_FAIL,
      });
    }
  };

  const followUser = async (id, crrUserId) => {
    try {
      const response = await userApi.followUser(id);
      if (response.success) {
        dispatch({
          type: FOLLOW_USER,
          payload: crrUserId,
        });
      }
      return response;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };

  const unfollowUser = async (id, crrUserId) => {
    try {
      const response = await userApi.unfollowUser(id);
      if (response.success) {
        dispatch({
          type: UNFOLLOW_USER,
          payload: crrUserId,
        });
      }
      return response;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };

  const searchUser = async(params) => {
    try {
      const response = await userApi.searchUser(params)
      if (response.success) {
        dispatch({
          type: SEARCH_USER,
          payload: response.users
        })
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  }

  const userContextData = {
    userState,
    dispatch,
    getUserFollowings,
    getUserFollowers,
    getUserUnfollowings,
    getUserById,
    followUser,
    unfollowUser,
    getAllUsers,
    searchUser
  };
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

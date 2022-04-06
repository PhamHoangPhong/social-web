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
  GET_ON_USER,
} from ".";
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_USER:
      return { ...state, users: payload, userLoading: false };
    case GET_ON_USER:
      return {
        ...state,
        userOnline: payload,
      };
    case GET_USER_FOLLOWINGS:
      return { ...state, userFollowings: payload, userLoading: false };
    case GET_USER_FAIL:
      return { ...state, userFollowings: [], userLoading: false };
    case GET_USER_FOLLOWERS:
      return { ...state, userFollowers: payload, userLoading: false };
    case GET_USER_UNFOLLOWINGS:
      return { ...state, userUnfollowings: payload, userLoading: false };
    case GET_USER_BY_ID:
      return { ...state, userSelected: payload, userLoading: false };
    case SEARCH_USER:
      return {
        ...state,
        usersSearch: payload,
        userLoading: false,
      };
    case FOLLOW_USER:
      return {
        ...state,
        userSelected: {
          ...state.userSelected,
          followers: [...state.userSelected.followers, payload],
        },
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        userSelected: {
          ...state.userSelected,
          followers: state.userSelected.followers.filter(
            (id) => id !== payload
          ),
        },
      };
    default:
      return state;
  }
};

export default userReducer;

import {
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  LIKE_POST,
  GET_SINGLE_POST,
  UPDATE_POST,
  GET_COMMENT,
  RELOAD_COMMENT,
  COMMENT,
  SHARE_POST,
} from ".";

const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        postLoading: false,
        posts: [...state.posts, payload],
      };
    case GET_POST:
      const posts =
        payload.page === 1 ? payload.posts : state.posts.concat(payload.posts);
      return {
        ...state,
        postLoading: false,
        posts: posts,
      };
    case GET_SINGLE_POST:
      return {
        ...state,
        postLoading: false,
        postSelected: payload,
      };
    case GET_COMMENT:
      const newComments = state.comments.concat(payload);
      return {
        ...state,
        comments: newComments,
        commentLoading: false,
      };
    case COMMENT:
      const newPostsAfterCmt = state.posts.map((post) => {
        if (post._id === payload.id) {
          post.comments.push(payload.newComment._id);
        }
        return post;
      });
      return {
        ...state,
        commentLoading: false,
        comments: [payload.newComment, ...state.comments],
        posts: newPostsAfterCmt,
      };
    case RELOAD_COMMENT:
      return {
        ...state,
        comments: payload,
      };
    case UPDATE_POST:
      const newPosts = state.posts.map((post) => {
        if (post._id === payload._id) {
          post = payload;
        }
        return post;
      });
      return {
        ...state,
        postLoading: false,
        posts: newPosts,
      };
    case DELETE_POST:
      return {
        ...state,
        postLoading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case LIKE_POST:
      const newPostsLiked = state.posts.map((post) => {
        if (post._id === payload.idPost) {
          if (!post.likes.includes(payload.userId))
            post.likes.push(payload.userId);
          else post.likes = post.likes.filter((id) => id !== payload.userId);
        }
        return post;
      });
      return {
        ...state,
        postLoading: false,
        posts: newPostsLiked,
      };
    case SHARE_POST:
      const postsAfterShare = state.posts.map((post) => {
        if (post._id === payload.idPost) {
          post.shares.push(payload.userId);
        }
        return post;
      });
      return {
        ...state,
        posts: [payload.sharePost, ...postsAfterShare],
        postLoading: false,
      };
    default:
      return state;
  }
};
export default postReducer;

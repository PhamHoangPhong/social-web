import { SET_AUTH, UPDATE_USER } from ".";
const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload
      }
    default:
      return state;
  }
};
export default authReducer;

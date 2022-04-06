import { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducer/authReducer";
import authApi from "../api/authApi";
import setAuthToken from "../util/setAuthToken";
import { SET_AUTH, UPDATE_USER } from "../reducer";
import userApi from "../api/userApi";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });
  const loadUser = async () => {
    if (localStorage[process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME])
      setAuthToken(
        localStorage[process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME]
      );
    try {
      const response = await authApi.loadUser();
      if (response.success) {
        dispatch({
          type: SET_AUTH,
          payload: { isAuthenticated: true, user: response.user },
        });
      }
    } catch (error) {
      setAuthToken(null);
      dispatch({
        type: SET_AUTH,
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const updateUser = async (params) => {
    try {
      const response = await authApi.updateUser(params);
      if (response.success) {
        dispatch({
          type: UPDATE_USER,
          payload: response.userUpdate,
        });
      }
      return response;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };
  const reloadInforUser = async () => {
    try {
      const response = await userApi.getUserById(authState.user._id);
      if (response.success)
        dispatch({
          type: UPDATE_USER,
          payload: response.other,
        });
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };

  const login = async (data) => {
    try {
      const response = await authApi.loginUser(data);
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME,
        response.data.tokens.accessToken
      );
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_STORAGE_REFRESHTOKEN_NAME,
        response.data.tokens.refreshToken
      );
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: "error" };
    }
  };

  const register = async (data) => {
    try {
      const response = await authApi.registerUser(data);
      return response.data;
    } catch (error) {
      if (error.response) return error.response.data;
      else return { success: false, message: "error" };
    }
  };

  const logout = async () => {
    try {
      await authApi.logoutUser();
      localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: SET_AUTH,
        payload: { isAuthenticated: false, user: null },
      });
    } catch (error) {
      if (error.response) return error.response.data;
      else return { success: false, message: "error" };
    }
  };

  const authContextData = {
    authState,
    dispatch,
    login,
    register,
    logout,
    updateUser,
    reloadInforUser
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;

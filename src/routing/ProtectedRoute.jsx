import React, { useContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import UpdatePostModal from "../components/modal/UpdatePostModal";
import { PostContext } from "../context/postContext";
import CommentModal from "../components/modal/CommentModal";
import SharePostModal from "../components/modal/SharePostModal";
import { io } from "socket.io-client";
import { UserContext } from "../context/userContext";
import { GET_ON_USER } from "../reducer";

const ProtectedRoute = () => {
  const socket = useRef();
  const { authState } = useContext(AuthContext);
  const {postState: {postSelected}, setNotification} = useContext(PostContext)
  const {dispatch} = useContext(UserContext)
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_HOST);
  }, []);
  useEffect(() => {
    authState.user?._id && socket.current.emit("addUser", authState.user?._id);
    socket.current.on("getUsers", (users) => {
      const userIdOnline = users.map((user) => user.userId);
      dispatch({
        type: GET_ON_USER,
        payload: userIdOnline
      })
    });

  }, [authState.user?._id, dispatch]);
  useEffect(() => {
    socket.current.on("getNotification", (data) => {
      setNotification((prev) => [...prev, data])
    });
  }, [setNotification]);

  if (authState.isLoading) {
    return <Loading />;
  } else
    return (
      <div className="container">
        <Navbar />
        {postSelected && <UpdatePostModal />}
        <CommentModal socket={socket} />
        <SharePostModal socket={socket} />
        {authState.isAuthenticated ? <Outlet context={socket} /> : <Navigate to="/login" />}
      </div>
    );
};
export default ProtectedRoute;

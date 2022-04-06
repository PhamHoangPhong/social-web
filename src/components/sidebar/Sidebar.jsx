import React, { useContext, useEffect, useRef } from "react";
import { Avatar, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { UserContext } from "../../context/userContext";
import FriendBox from "./FriendBox";
const Sidebar = ({ settingListIcon, userOnline }) => {
  const {
    authState: { user }
  } = useContext(AuthContext);
  const {
    userState: { userFollowings },
    getUserFollowings,
  } = useContext(UserContext);

  //ref for warning missing dependency getUserFollowings
  const ref = useRef();
  ref.current = getUserFollowings;
  useEffect(() => ref.current(user?._id), [user?._id]);
  return (
    <>
      <Box className="rightbar__title">
        <p>LỐI TẮT</p>
      </Box>
      <Link to={`/profile/${user?._id}`}>
        <Box className="rightbar__friend">
          <Box
            style={{ paddingLeft: "20px" }}
            className="rightbar__friend-info"
          >
            <Avatar
              src={
                user?.profilePicture
                  ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
                  : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
              }
            />
            <div className="rightbar__friend-ml">
              <p>{user?.username}</p>
            </div>
          </Box>
        </Box>
      </Link>
      {settingListIcon.map((item) => {
        return (
          <Link key={item.id} to={item.path}>
            <Box className="rightbar__friend">
              <Box
                style={{ paddingLeft: "20px" }}
                className="rightbar__friend-info"
              >
                <IconButton style={{ background: "" }}>{item.icon}</IconButton>
                <div className="rightbar__friend-ml">
                  <p>{item.name}</p>
                  <small>
                    {item.name === "Bạn bè"
                      ? `${user?.following.length} followings`
                      : item.title}
                  </small>
                </div>
              </Box>
            </Box>
          </Link>
        );
      })}
      <Box className="rightbar__title">
        <p>FRIENDS</p>
      </Box>
      {userFollowings.sort((a, b) => userOnline?.includes(a._id) && -1).map((user) => (
        <Link key={user?._id} to={`/profile/${user?._id}`}>
          <FriendBox userOnline={userOnline} user={user} />
        </Link>
      ))}
    </>
  );
};

export default Sidebar;

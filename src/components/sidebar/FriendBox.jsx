import React from "react";
import { Box, Avatar, Badge } from "@mui/material";
import { FriendBoxStyled } from "./SidebarStyled";
const FriendBox = ({ user, userOnline }) => {
  return (
    <FriendBoxStyled>
      <Box className="rightbar__friend">
        <Box className="rightbar__friend-info">
          <Avatar
            src={
              user?.profilePicture
                ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
                : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
            }
          />
          <div className="rightbar__friend-ml">
            <p>{user?.username}</p>
            {user?.followers ? (
              <small>{user?.followers.length} followers</small>
            ) : (
              ""
            )}
          </div>
        </Box>
        <small className="rightbar__friend-offline">
          {userOnline?.includes(user._id) ? (
            <Badge
              color="success"
              variant="dot"
              
            ></Badge>
          ) : (
            "Offline"
          )}
        </small>
      </Box>
    </FriendBoxStyled>
  );
};

export default FriendBox;

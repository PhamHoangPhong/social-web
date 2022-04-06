import { Avatar } from "@mui/material";
import React from "react";
import { MessageTextStyled } from "./MessageBodyStyled";
import { format } from "timeago.js";

const MessageText = ({ owner, message }) => {
  return (
    <MessageTextStyled>
      <div className={`textbox ${owner && "owner"}`}>
        <Avatar
          src={
            message.sender?.profilePicture
              ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${message.sender?.profilePicture}`
              : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
          }
        />
        <div className={`textbox-content ${owner && "owner-box"}`}>
          <p>{message.text}</p>
        </div>
        <small className="textbox-time">{format(message.createdAt)}</small>
      </div>
    </MessageTextStyled>
  );
};

export default MessageText;

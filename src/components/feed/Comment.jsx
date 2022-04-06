import React from "react";
import { Avatar } from "@mui/material";
import { format } from "timeago.js";

const Comment = ({ comment }) => {
  return (
    <div className="post__comment-content">
      <Avatar
        src={
          comment?.user.profilePicture
            ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${comment?.user.profilePicture}`
            : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
        }
      />
      <div className="post__comment-content--box">
        <p>{comment?.user.username}</p>
        <small>{comment.text}</small>
      </div>
      <small className="post__comment-content--time">
        {format(comment?.createdAt)}
      </small>
    </div>
  );
};

export default Comment;

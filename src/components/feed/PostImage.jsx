import React from "react";
import { ImageList, ImageListItem } from "@mui/material";
const PostImage = ({ post }) => {
  return (
    <ImageList cols={post?.photoUrl?.length === 1 ? 1 : 2} rowHeight="auto">
      {post?.photoUrl?.map((photo, index) => (
        <ImageListItem
          key={index}
          className={`post__body-img--item ${
            index > 3 ? "post__body-img--none" : ""
          }`}
          cols={index === 0 && post?.photoUrl?.length === 3 ? 2 : 1}
          rows={1}
        >
          <img
            src={`${process.env.REACT_APP_PUBLIC_FOLDER}feed/${photo}`}
            alt="imagepost"
          />
          {index === 3 ? (
            <div className="post__body-img--children">
              <p>+ {post?.photoUrl?.length - 4}</p>
            </div>
          ) : (
            ""
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default PostImage;

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BsPencilSquare,
  BsCardImage,
  BsFillEmojiLaughingFill,
  BsFillTagsFill,
  BsCursor,
  BsDashCircleFill,
} from "react-icons/bs";
import { Avatar, Box, IconButton, Button, ImageListItem } from "@mui/material";
import { CreatePostStyled, ImageRenderStyled } from "./CreatePostStyled";
import { AuthContext } from "../../context/authContext";
import Picker from "emoji-picker-react";
import uploadApi from "../../api/uploadApi";
import { PostContext } from "../../context/postContext";
import { useParams } from "react-router-dom";
const CreatePost = () => {
  const [files, setFile] = useState([]);
  const [desc, setDesc] = useState("");
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { createPost, getPostByUser, getPostTimeLine } =
    useContext(PostContext);

  const { id } = useParams();
  //close emoji picker when click outside
  const inEmojiRef = useRef(null);
  const clickOutSideRef = (inEmojiRef) => {
    document.addEventListener("mousedown", (e) => {
      if (inEmojiRef.current && !inEmojiRef.current.contains(e.target)) {
        setIsEmojiVisible(false);
      }
    });
  };
  useEffect(() => {
    clickOutSideRef(inEmojiRef);
  }, [inEmojiRef]);
  const onEmojiClick = (event, emojiObject) => {
    setDesc(prev => prev + emojiObject.emoji)
  };

  const uploadPostImage = (e) => {
    setFile(files.concat(Object.values(e.target.files)));
  };
  const removeFiles = (name) => {
    const newFiles = files.filter((file) => file.name !== name);
    setFile(newFiles);
  };

  const onHandleCreatePost = (e) => {
    setDesc(e.target.value);
  };
  const onSubmitCreatePost = async (e) => {
    e.preventDefault();
    let arrayImg = [];
    if (files.length > 0) {
      const data = new FormData();
      files.forEach((file) => {
        const filename = Date.now() + file.name;
        data.append("file", file);
        data.append("name", filename);
        arrayImg.push(file.name);
      });
      try {
        await uploadApi.uploadArrayImage(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (desc) {
      createPost({ desc, photoUrl: arrayImg });
      setFile([]);
      setDesc("");
      if (!id) getPostTimeLine({ page: 1 });
      else {
        getPostByUser({ id, page: 1 });
      }
    }
  };

  return (
    <CreatePostStyled>
      <Box className="crtpost">
        <div className="crtpost__header">
          <IconButton
            size="medium"
            style={{ background: "var(--bg-shade)", padding: "8px" }}
          >
            <BsPencilSquare style={{ fontSize: "17px" }} />
          </IconButton>
          <p>Tạo bài đăng</p>
        </div>
        <form onSubmit={onSubmitCreatePost} style={{ position: "relative" }}>
          <div className="crtpost__body">
            <Avatar
              className="crtpost__body-avatar"
              sx={{ width: 28, height: 28 }}
              src={
                user?.profilePicture
                  ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
                  : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
              }
            />
            <textarea
              type="text"
              placeholder= "Bạn đang nghĩ gì thế ?"
              onChange={onHandleCreatePost}
              value={desc}
            />
          </div>
          {files && (
            <ImageRenderStyled cols={4} rowHeight="auto">
              {files.map((file, index) => (
                <ImageListItem className="img-item" key={index}>
                  <img
                    className="img-item__img"
                    src={URL.createObjectURL(file)}
                    alt="feed"
                  />
                  <BsDashCircleFill
                    className="img-item__icon"
                    onClick={() => removeFiles(file.name)}
                  />
                </ImageListItem>
              ))}
            </ImageRenderStyled>
          )}
          <div className="crtpost__media">
            <div>
              <label htmlFor="icon-button-file-post">
                <input
                  accept="image/*"
                  id="icon-button-file-post"
                  type="file"
                  onChange={uploadPostImage}
                  style={{ display: "none" }}
                  multiple
                />
                <Button
                  style={{
                    textTransform: "none",
                    color: "var(--color-navy)",
                    fontWeight: "bolder",
                  }}
                  variant="text"
                  component="span"
                  startIcon={
                    <BsCardImage style={{ color: "var(--color-success)" }} />
                  }
                >
                  Photo/Image
                </Button>
              </label>
              <Button
                className="crtpost__media-icon"
                style={{ marginLeft: "8px" }}
                startIcon={
                  <BsFillTagsFill style={{ color: "var(--color-primary)" }} />
                }
              >
                Tag
              </Button>
              <Button
                className="crtpost__media-icon"
                style={{ marginLeft: "8px" }}
                startIcon={
                  <BsFillEmojiLaughingFill
                    style={{ color: "var(--color-warning)" }}
                  />
                }
                onClick={() => setIsEmojiVisible(!isEmojiVisible)}
              >
                Feeling/Activity
              </Button>
            </div>
            <Button
              className="crtpost__media-icon"
              style={{ color: "var(--bg-box)" }}
              variant="contained"
              color="success"
              size="small"
              endIcon={<BsCursor style={{ color: "var(--bg-box)" }} />}
              type="submit"
            >
              Đăng
            </Button>
          </div>
          {isEmojiVisible ? (
            <div
              style={{ position: "absolute", right: 0, zIndex: 10 }}
              ref={inEmojiRef}
            >
              <Picker onEmojiClick={onEmojiClick} disableSearchBar={true} />
            </div>
          ) : (
            ""
          )}
        </form>
      </Box>
    </CreatePostStyled>
  );
};

export default CreatePost;

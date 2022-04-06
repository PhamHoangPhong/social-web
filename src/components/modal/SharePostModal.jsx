import React, { useContext, useState } from "react";
import { PostContext } from "../../context/postContext";
import {
  Modal,
  Box,
  Avatar,
  ImageList,
  ImageListItem,
  TextareaAutosize,
  Button,
} from "@mui/material";
import { FeedStyled } from "../feed/FeedStyled";
import { format } from "timeago.js";
import { ModalStyled } from "./ModalStyled";
import { BsXLg, BsShare } from "react-icons/bs";
import { ModalShareStyled } from "./ModalStyled";
import { AuthContext } from "../../context/authContext";
const SharePostModal = () => {
  const {
    sharePostModal,
    setSharePostModal,
    sharePost,
    postState: { postSelected },
  } = useContext(PostContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const handleClose = () => {
    setSharePostModal(false);
  };

  const onHandleSharePost = (e) => {
    setDesc(e.target.value);
  };

  const onSubmitSharePost = (e) => {
    e.preventDefault();
    sharePost({id: postSelected._id, desc, userId: user._id});
    handleClose();
  };
  return (
    <Modal
      open={sharePostModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalStyled>
        <FeedStyled>
          <ModalShareStyled onSubmit={onSubmitSharePost}>
            <form>
              <div className="post__header">
                <div className="post__header-user">
                  <Avatar
                    src={
                      user?.profilePicture
                        ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
                        : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                    }
                  />
                  <div style={{ marginLeft: "15px" }}>
                    <p>{user?.username}</p>
                    <small>Share now</small>
                  </div>
                </div>
                <BsXLg style={{ cursor: "pointer" }} onClick={handleClose} />
              </div>
              <TextareaAutosize
                autoFocus
                className="modal-text modal-share-text"
                value={desc}
                onChange={onHandleSharePost}
              />
              <div className="modal-body">
                <Box className="post container" style={{ marginTop: 0 }}>
                  <div className="post__header">
                    <div className="post__header-user">
                      <Avatar
                        src={
                          postSelected?.user.profilePicture
                            ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${postSelected?.user.profilePicture}`
                            : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                        }
                      />
                      <div style={{ marginLeft: "15px" }}>
                        <p>{postSelected?.user?.username}</p>
                        <small>
                          {postSelected?.createdAt &&
                            format(postSelected?.createdAt)}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="post__body">
                    <p>{postSelected?.desc}</p>
                    {postSelected?.photoUrl.length > 0 && (
                      <div className="post__body-img">
                        <ImageList
                          cols={postSelected?.photoUrl.length === 1 ? 1 : 2}
                          rowHeight="auto"
                        >
                          {postSelected?.photoUrl.map((photo, index) => (
                            <ImageListItem key={index}>
                              <img
                                src={`${process.env.REACT_APP_PUBLIC_FOLDER}feed/${photo}`}
                                alt="imagepost"
                              />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </div>
                    )}
                  </div>
                </Box>
                <div className="modal-bottom">
                  <Button
                    type="submit"
                    className="modal-btn"
                    variant="contained"
                    startIcon={<BsShare />}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </form>
          </ModalShareStyled>
        </FeedStyled>
      </ModalStyled>
    </Modal>
  );
};

export default SharePostModal;

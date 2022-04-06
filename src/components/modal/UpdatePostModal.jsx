import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../context/postContext";
import { Modal, Box, Avatar, ImageList, ImageListItem, TextareaAutosize, Button } from "@mui/material";
import { FeedStyled } from "../feed/FeedStyled";
import { format } from "timeago.js";
import { ModalStyled } from "./ModalStyled";
import { BsXLg, BsPencilSquare } from "react-icons/bs";

const UpdatePostModal = () => {
  const {
    updatePostModal,
    setUpdatePostModal,
    updatePost,
    postState: { postSelected },
  } = useContext(PostContext);
  const [desc, setDesc] = useState("")
  useEffect(() => setDesc(postSelected?.desc), [postSelected])
  const onHandleUpdatePost = e => {
      setDesc(e.target.value)
  }
  const onSubmitUpdatePost = e => {
    e.preventDefault()
    updatePost({id: postSelected._id, desc})
    handleClose()
  }
  const handleClose = () => {
    setUpdatePostModal(false);
  };
  return (
    <Modal
      open={updatePostModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalStyled>
        <FeedStyled >
          <form onSubmit={onSubmitUpdatePost}>
            <Box className="post container" >
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
                <BsXLg style={{ cursor: "pointer" }} onClick={handleClose} />
              </div>
              <div className="post__body">
                <TextareaAutosize autoFocus className="modal-text" value={desc} onChange={onHandleUpdatePost} />
                {postSelected?.photoUrl.length === 0 ? (
                  ""
                ) : (
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
              <Button type="submit" className="modal-btn" variant="contained" startIcon={<BsPencilSquare />} >Cập nhật</Button>
            </Box>
          </form>
        </FeedStyled>
      </ModalStyled>
    </Modal>
  );
};

export default UpdatePostModal;

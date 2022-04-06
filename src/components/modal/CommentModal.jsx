import React, { useContext, useState } from "react";
import { PostContext } from "../../context/postContext";
import { ModalStyled } from "./ModalStyled";
import { FeedStyled } from "../feed/FeedStyled";
import { Avatar, CircularProgress, Modal, Box } from "@mui/material";
import Comment from "../feed/Comment";
import { AuthContext } from "../../context/authContext";
import { RELOAD_COMMENT } from "../../reducer";
const CommentModal = ({socket}) => {
  const [page, setPage] = useState(2);
  const [isLoadedAll, setIsLoadedAll] = useState(false);
  const [comment, setComment] = useState("");
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    commentModal,
    setCommentModal,
    getComments,
    commentPost,
    idPost,
    postState: { comments, commentLoading, postSelected },
    dispatch,
  } = useContext(PostContext);
  const handleClose = () => {
    setCommentModal(false);
    setIsLoadedAll(false);
    setPage(2);
    dispatch({
      type: RELOAD_COMMENT,
      payload: [],
    });
  };
  const onLoadComment = async () => {
    const response = await getComments({ id: idPost, page });
    if (response.comments.length === 0) setIsLoadedAll(true);
    setPage(page + 1);
  };
  const onHandleComment = (e) => {
    setComment(e.target.value);
  };
  const onSubmitComment = e => {
    e.preventDefault();
    commentPost({id: idPost, comment})
    setComment("")
    if (postSelected?.user._id !== user._id) {
      socket.current.emit("sendNotification", {
        notification: `${user?.username} đã comment bài viết của bạn`,
        receiverId : postSelected?.user._id,
      });
    }
  }
  return (
    <Modal
      open={commentModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalStyled>
        <FeedStyled>
          <div className="post__comment">
            {comments.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
            {commentLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              ""
            )}
            {isLoadedAll ? (
              ""
            ) : (
              <small style={{ cursor: "pointer" }} onClick={onLoadComment}>
                Tải thêm bình luận...
              </small>
            )}
          </div>
          <form className="post__comment-form" onSubmit={onSubmitComment}>
            <Avatar
              src={
                user?.profilePicture
                  ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
                  : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
              }
            />
            <input
              className="post__comment-form--input"
              placeholder="Nhập comment"
              onChange={onHandleComment}
              value={comment}
            />
          </form>
        </FeedStyled>
      </ModalStyled>
    </Modal>
  );
};

export default CommentModal;

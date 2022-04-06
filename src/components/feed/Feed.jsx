import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  BsHeart,
  BsChat,
  BsThreeDots,
  BsFillHeartFill,
  BsShare,
} from "react-icons/bs";
import { SRLWrapper } from "simple-react-lightbox";
import ShowMoreText from "react-show-more-text";
import { FeedStyled } from "./FeedStyled";
import { Link, useParams } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import { format } from "timeago.js";
import { AuthContext } from "../../context/authContext";
import PostImage from "./PostImage";
import { ModalShareStyled } from "../modal/ModalStyled";

const Feed = ({ socket }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    getPostByUser,
    getPostTimeLine,
    deletePost,
    likePost,
    setUpdatePostModal,
    getSinglePost,
    setCommentModal,
    getComments,
    idPost,
    setIdPost,
    setSharePostModal,
    postState: { posts, postLoading },
  } = useContext(PostContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { id } = useParams();
  const executeOnClick = (isExpanded) => {
    //setIsExpanded(isExpanded)
  };

  //ref for warning: missing dependency getPostByUser, getPostTimeLine
  const refPostTimeLine = useRef();
  const refPostByUser = useRef();
  refPostByUser.current = getPostByUser;
  refPostTimeLine.current = getPostTimeLine;
  useEffect(() => {
    if (!id) {
      refPostTimeLine.current({ page: 1 });
    } else {
      refPostByUser.current({ id, page: 1 });
    }
  }, [id]);
  //handle show button edit or delete post
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setIdPost(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIdPost("");
  };
  const handleEdit = async () => {
    handleClose();
    const response = await getSinglePost(idPost);
    if (response.success) setUpdatePostModal(true);
  };
  const onOpenModalShare = async (id) => {
    const response = await getSinglePost(id);
    if (response.success) setSharePostModal(true);
  };
  const handleDelete = () => {
    deletePost(idPost);
    handleClose();
  };
  const onShowComment = (id) => {
    getSinglePost(id)
    getComments({ id, page: 1 });
    setIdPost(id);
    setCommentModal(true);
  };
  const onLikePost = async(postId, userId, receiverId) => {
    const response = await likePost(postId, userId);
    if (response && userId !== receiverId) {
      socket.current.emit("sendNotification", {
        notification: `${user?.username} đã ${
          response.success ? "thả tym" : "gỡ thả tym"
        } bài viết của bạn`,
        receiverId,
      });
    }
  };
  if (postLoading)
    return (
      <Box sx={{ width: "100%" }} style={{ padding: "20px" }}>
        <LinearProgress />
      </Box>
    );
  else
    return (
      <FeedStyled>
        {posts.length === 0 ? (
          <p style={{ color: "var(--color-gray-shade)", padding: "20px" }}>
            Chưa có bài đăng nào!. Theo dõi người khác để có thể xem nhiều bài
            đăng hơn hoặc tạo bài viết để chia sẻ cùng mọi người nhé!
          </p>
        ) : (
          posts.map((post) => {
            if (!post.postShare) {
              return (
                <Box className="post" key={post?._id}>
                  <div className="post__header">
                    <div className="post__header-user">
                      <Avatar
                        src={
                          post?.user.profilePicture
                            ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${post?.user.profilePicture}`
                            : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                        }
                      />
                      <div style={{ marginLeft: "15px" }}>
                        <Link to={`/profile/${post?.user._id}`}>
                          <p>{post?.user?.username}</p>
                        </Link>
                        <small>{post && format(post?.createdAt)}</small>
                      </div>
                    </div>
                    {post?.user._id === user?._id && (
                      <div>
                        <IconButton onClick={(e) => handleClick(e, post?._id)}>
                          <BsThreeDots />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          sx={{ mr: "20px" }}
                          keepMounted
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                        >
                          <MenuItem onClick={handleEdit}>Edit</MenuItem>
                          <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                      </div>
                    )}
                  </div>
                  <div className="post__body">
                    <ShowMoreText
                      lines={3}
                      more="Xem thêm"
                      less="Ẩn"
                      className="content-css"
                      anchorClass="my-anchor-css-class"
                      onClick={executeOnClick}
                      expanded={false}
                      width={400}
                      truncatedEndingComponent={"... "}
                    >
                      <p>{post?.desc}</p>
                    </ShowMoreText>
                    {post?.photoUrl.length === 0 ? (
                      ""
                    ) : (
                      <div
                        className="post__body-img"
                        onMouseEnter={() => setIdPost(post?._id)}
                      >
                        {idPost === post?._id ? (
                          <SRLWrapper>
                            <PostImage post={post} />
                          </SRLWrapper>
                        ) : (
                          <PostImage post={post} />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="post__media">
                    <div className="post__media-icon">
                      <IconButton
                        size="medium"
                        style={{ padding: "8px" }}
                        onClick={() =>
                          onLikePost(post?._id, user?._id, post?.user._id)
                        }
                      >
                        {post?.likes.includes(user?._id) ? (
                          <BsFillHeartFill
                            style={{ color: "var(--color-danger)" }}
                            className="iconSize"
                          />
                        ) : (
                          <BsHeart className="iconSize" />
                        )}
                      </IconButton>
                      <small>{post?.likes.length} Liked</small>
                    </div>
                    <div
                      style={{ marginLeft: "20px" }}
                      className="post__media-icon"
                    >
                      <IconButton
                        size="medium"
                        style={{ padding: "8px" }}
                        onClick={() => onShowComment(post?._id)}
                      >
                        <BsChat className="iconSize" />
                      </IconButton>
                      <small>{post?.comments.length} Comments</small>
                    </div>
                    <div
                      style={{ marginLeft: "20px" }}
                      className="post__media-icon"
                    >
                      <IconButton
                        size="medium"
                        style={{ padding: "8px" }}
                        onClick={() => onOpenModalShare(post?._id)}
                      >
                        <BsShare className="iconSize" />
                      </IconButton>
                      <small>{post?.shares.length} Shares</small>
                    </div>
                  </div>
                </Box>
              );
            } else {
              return (
                <ModalShareStyled className="post-share" key={post?._id}>
                  <div className="post__header">
                    <div className="post__header-user">
                      <Avatar
                        src={
                          post?.user.profilePicture
                            ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${post?.user.profilePicture}`
                            : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                        }
                      />
                      <div style={{ marginLeft: "15px" }}>
                        <Link to={`/profile/${post?.user._id}`}>
                          <p>{post?.user?.username}</p>
                        </Link>
                        <small>{post && format(post?.createdAt)}</small>
                      </div>
                    </div>
                    {post?.user._id === user?._id && (
                      <div>
                        <IconButton onClick={(e) => handleClick(e, post?._id)}>
                          <BsThreeDots />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          sx={{ mr: "20px" }}
                          keepMounted
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                        >
                          <MenuItem onClick={handleEdit}>Edit</MenuItem>
                          <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                      </div>
                    )}
                  </div>
                  <p className="post-share__content">{post?.desc}</p>
                  <Box className="post post-share__box">
                    <div className="post__header">
                      <div className="post__header-user">
                        <Avatar
                          src={
                            post?.postShare?.user?.profilePicture
                              ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${post?.postShare?.user?.profilePicture}`
                              : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                          }
                        />
                        <div style={{ marginLeft: "15px" }}>
                          <Link to={`/profile/${post?.postShare?.user?._id}`}>
                            <p>{post?.postShare?.user?.username}</p>
                          </Link>
                          <small>{format(post?.postShare?.createdAt)}</small>
                        </div>
                      </div>
                    </div>
                    <div className="post__body">
                      <ShowMoreText
                        lines={3}
                        more="Xem thêm"
                        less="Ẩn"
                        className="content-css"
                        anchorClass="my-anchor-css-class"
                        onClick={executeOnClick}
                        expanded={false}
                        width={400}
                        truncatedEndingComponent={"... "}
                      >
                        <p>{post?.postShare?.desc}</p>
                      </ShowMoreText>
                      {post?.postShare?.photoUrl?.length === 0 ? (
                        ""
                      ) : (
                        <div
                          className="post__body-img"
                          onMouseEnter={() => setIdPost(post?._id)}
                        >
                          {idPost === post?._id ? (
                            <SRLWrapper>
                              <PostImage post={post?.postShare} />
                            </SRLWrapper>
                          ) : (
                            <PostImage post={post?.postShare} />
                          )}
                        </div>
                      )}
                    </div>
                  </Box>
                  <div className="post__media">
                    <div className="post__media-icon">
                      <IconButton
                        size="medium"
                        style={{ padding: "8px" }}
                        onClick={() =>
                          onLikePost(post?._id, user?._id, post?.user._id)
                        }
                      >
                        {post?.likes.includes(user?._id) ? (
                          <BsFillHeartFill
                            style={{ color: "var(--color-danger)" }}
                            className="iconSize"
                          />
                        ) : (
                          <BsHeart className="iconSize" />
                        )}
                      </IconButton>
                      <small>{post?.likes.length} Liked</small>
                    </div>
                    <div
                      style={{ marginLeft: "20px" }}
                      className="post__media-icon"
                    >
                      <IconButton
                        size="medium"
                        style={{ padding: "8px" }}
                        onClick={() => onShowComment(post?._id)}
                      >
                        <BsChat className="iconSize" />
                      </IconButton>
                      <small>{post?.comments.length} Comments</small>
                    </div>
                  </div>
                </ModalShareStyled>
              );
            }
          })
        )}
      </FeedStyled>
    );
};

export default Feed;

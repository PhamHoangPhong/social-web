import React, { useContext, useEffect, useRef } from "react";
import {
  Avatar,
  Button,
  Grid,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import {
  BsFillPersonPlusFill,
  BsChatDots,
  BsCamera,
  BsFillPersonCheckFill,
} from "react-icons/bs";
import { WrapperProfileStyled } from "./ProfileStyled";
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import { UserContext } from "../../context/userContext";
import uploadApi from "../../api/uploadApi";
import ProfileBody from "./ProfileBody";
import { ConversationContext } from "../../context/conversationContext";
const Input = styled("input")({
  display: "none",
});

const Profile = () => {
  const socket = useOutletContext();
  const { pathname } = useLocation();
  const { id } = useParams();
  const {
    authState: { user },
    updateUser,
    reloadInforUser,
  } = useContext(AuthContext);
  const {
    userState: { userSelected },
    getUserById,
    followUser,
    unfollowUser,
  } = useContext(UserContext);
  const { createConversation, setConversationSelected, getMessages } =
    useContext(ConversationContext);

  //ref for warning: missing dependency getUserById
  const ref = useRef();
  ref.current = getUserById;
  useEffect(() => {
    ref.current(id);
  }, [id]);

  //array for loop all Link in profile
  const profileLink = [
    {
      id: 1,
      name: "Bài viết",
      path: `/profile/${id}`,
    },
    {
      id: 2,
      name: "Thông tin",
      path: `/profile/${id}/about`,
    },
    {
      id: 3,
      name: "Followers",
      path: `/profile/${id}/friend`,
    },
    {
      id: 4,
      name: "Media",
      path: `/profile/${id}/picture`,
    },
    {
      id: 5,
      name: "Followings",
      path: `/profile/${id}/following`,
    },
  ];

  const onFollowUser = async (id, userId) => {
    const response = await followUser(id, userId);
    if (response.success) reloadInforUser();
    socket.current.emit("sendNotification", {
      notification: `${user?.username} đã follow bạn`,
      receiverId : id,
    });
  };
  const onUnfollowUser = async (id, userId) => {
    const response = await unfollowUser(id, userId);
    if (response.success) reloadInforUser();
    socket.current.emit("sendNotification", {
      notification: `${user?.username} đã bỏ follow bạn`,
      receiverId : id,
    });
  };

  const uploadCoverImage = async ({ target: { files } }) => {
    const data = new FormData();
    const filename = Date.now() + files[0].name;
    const params = { id: user._id, data: { coverPicture: files[0].name } };
    data.append("file", files[0]);
    data.append("name", filename);
    try {
      await uploadApi.uploadSingleImage(data);
    } catch (error) {
      console.log(error);
    }
    updateUser(params);
    window.location.reload();
  };
  const uploadProfileImage = async ({ target: { files } }) => {
    const data = new FormData();
    const filename = Date.now() + files[0].name;
    const params = { id: user._id, data: { profilePicture: files[0].name } };
    data.append("file", files[0]);
    data.append("name", filename);
    try {
      await uploadApi.uploadSingleImage(data);
    } catch (error) {
      console.log(error);
    }
    updateUser(params);
    window.location.reload();
  };

  const navigate = useNavigate();
  const findMemberFriend = (members) => {
    const member = members?.find((member) => member._id !== user?._id);
    return member;
  };
  const createNewConversation = async () => {
    const response = await createConversation(userSelected._id);
    if (response.success) {
      const idConversation = response.newConversation
        ? response.newConversation._id
        : response.checkNewConversation._id;
      const members = response.newConversation
        ? response.newConversation.members
        : response.checkNewConversation.members;
      setConversationSelected({
        id: idConversation,
        user: findMemberFriend(members),
        members
      });
      await getMessages(idConversation);
      navigate("/message");
    }
  };
  return (
    <WrapperProfileStyled>
      <Grid item container spacing={3} className="profile">
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          sx={{ display: { sm: "none", md: "block" } }}
        ></Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Box className="profile__header">
            <div style={{ position: "relative" }}>
              <ImageList cols={1} gap={10} rowHeight={350}>
                <ImageListItem>
                  <img
                    className="profile__header-img"
                    alt="cover"
                    src={
                      userSelected?.coverPicture
                        ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${userSelected?.coverPicture}`
                        : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/nocover2.jpg`
                    }
                    style={{ background: "var(--bg-layout)" }}
                  />
                </ImageListItem>
              </ImageList>
              {id === user?._id ? (
                <form
                  style={{
                    position: "absolute",
                    right: "15px",
                    bottom: "10px",
                  }}
                >
                  <label htmlFor="icon-button-file-cover">
                    <Input
                      accept=".png, .jpg, .jpeg"
                      id="icon-button-file-cover"
                      type="file"
                      onChange={uploadCoverImage}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      style={{ background: "#343a408a" }}
                    >
                      <BsCamera style={{ color: "var(--bg-box)" }} />
                    </IconButton>
                  </label>
                </form>
              ) : (
                ""
              )}
            </div>
            <div className="profile__header-info">
              <div className="profile__header-info--left">
                <div className="profile__header-info--img">
                  <Avatar
                    style={{ border: "5px solid var(--bg-box)" }}
                    sx={{ width: 145, height: 145 }}
                    src={
                      userSelected?.profilePicture
                        ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${userSelected?.profilePicture}`
                        : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                    }
                  />
                  {id === user?._id ? (
                    <label htmlFor="icon-button-file-avatar">
                      <Input
                        accept="image/*"
                        id="icon-button-file-avatar"
                        type="file"
                        onChange={uploadProfileImage}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        style={{ background: "#343a408a", zIndex: 10 }}
                      >
                        <BsCamera style={{ color: "var(--bg-box)" }} />
                      </IconButton>
                    </label>
                  ) : (
                    ""
                  )}
                </div>

                <div style={{ lineHeight: "22px" }}>
                  <p>{userSelected?.username}</p>
                  <small>{userSelected?.email}</small>
                </div>
              </div>
              {id === user?._id ? (
                ""
              ) : (
                <Box>
                  <Button
                    className="profile__header-info--button"
                    sx={{ size: { sm: "small" } }}
                    variant="contained"
                    startIcon={
                      <BsChatDots style={{ color: "var(--bg-box)" }} />
                    }
                    onClick={createNewConversation}
                  >
                    Nhắn tin
                  </Button>
                  {userSelected?.followers.includes(user?._id) ? (
                    <Button
                      className="profile__header-info--button"
                      variant="contained"
                      color="error"
                      startIcon={
                        <BsFillPersonCheckFill
                          style={{ color: "var(--bg-box)" }}
                        />
                      }
                      onClick={() =>
                        onUnfollowUser(userSelected?._id, user?._id)
                      }
                    >
                      Bỏ Follow
                    </Button>
                  ) : (
                    <Button
                      className="profile__header-info--button"
                      variant="contained"
                      startIcon={
                        <BsFillPersonPlusFill
                          style={{ color: "var(--bg-box)" }}
                        />
                      }
                      onClick={() => onFollowUser(userSelected?._id, user?._id)}
                    >
                      Follow
                    </Button>
                  )}
                </Box>
              )}
            </div>
            <Divider style={{ marginTop: "15px" }} />
            <div className="profile__header-link">
              {profileLink.map((item) => {
                return (
                  <Link key={item.id} to={item.path}>
                    <Button
                      className={`profile__header-link--button ${
                        item.path === pathname ? "active" : ""
                      }`}
                      variant="text"
                    >
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </Box>
          {pathname === `/profile/${id}` && (
            <ProfileBody idparam={id} userId={user._id} socket={socket} />
          )}
          <Outlet />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        ></Grid>
      </Grid>
    </WrapperProfileStyled>
  );
};

export default Profile;

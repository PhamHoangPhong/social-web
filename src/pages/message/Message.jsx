import React, { useContext, useEffect, useRef, useState } from "react";
import { Grid, Box, Avatar } from "@mui/material";
import { WrapperMessageStyled } from "./MessageStyled";
import FriendBox from "../../components/sidebar/FriendBox";
import { AuthContext } from "../../context/authContext";
import MessageText from "../../components/message/MessageText";
import MessageForm from "../../components/message/MessageForm";
import { ConversationContext } from "../../context/conversationContext";
import { BsPersonCheck, BsGenderFemale } from "react-icons/bs";
import { Link, useOutletContext } from "react-router-dom";
import { UPDATE_MESSAGE } from "../../reducer";
import { UserContext } from "../../context/userContext";
const Message = () => {
  const socket = useOutletContext();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const {userState: {userOnline}} = useContext(UserContext)
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    conversationState: { conversations, messages },
    getConversations,
    getMessages,
    conversationSelected,
    setConversationSelected,
    dispatch,
  } = useContext(ConversationContext);
  useEffect(() => {
    socket.current.on("getMessage", (message) => {
      setArrivalMessage(message);
    });
  }, []);

  //socket
  const checkCurrentConv = (senderId) => {
    return conversationSelected.members.find((conv) => conv._id === senderId)
      ? true
      : false;
  };
  useEffect(() => {
    let isUpdateMess = true;
    arrivalMessage &&
      checkCurrentConv(arrivalMessage.sender._id) &&
      isUpdateMess &&
      dispatch({
        type: UPDATE_MESSAGE,
        payload: arrivalMessage,
      });
    return () => (isUpdateMess = false);
  }, [arrivalMessage, conversationSelected, dispatch]);

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  //ref for warning missing dependency getUserFollowings
  const ref = useRef();
  ref.current = getConversations;
  useEffect(() => ref.current(), []);

  const findMemberFriend = (members) => {
    const member = members.find((member) => member._id !== user?._id);
    return member;
  };
  const selectConversation = (conversation) => {
    setConversationSelected({
      id: conversation._id,
      user: findMemberFriend(conversation.members),
      members: conversation.members,
    });
    getMessages(conversation._id);
  };

  const returnRelationship = (data) => {
    if (data === 0) {
      return "Nam";
    } else if (data === 1) return "Nữ";
  };

  return (
    <WrapperMessageStyled>
      <Grid container spacing={0} className="message">
        <Grid item xs={3} className="message-list">
          <div className="message-list__title">
            <p>Chat</p>
          </div>
          {conversations.map((conversation) => (
            <div
              key={conversation?._id}
              onClick={() => selectConversation(conversation)}
              className={
                conversation._id === conversationSelected.id ? "active" : ""
              }
            >
              <FriendBox
                user={findMemberFriend(conversation.members)}
                userOnline={userOnline}
              />
            </div>
          ))}
        </Grid>
        <Grid item xs={6} className="message-center">
          {conversationSelected.user ? (
            <>
              <Box className="message-center__header">
                <Avatar
                  src={
                    conversationSelected.user?.profilePicture
                      ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${conversationSelected.user?.profilePicture}`
                      : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                  }
                />
                <div className="message-center__header-info">
                  <p>{conversationSelected.user?.username}</p>
                  <small>
                    {userOnline?.includes(conversationSelected.user?._id)
                      ? "Online"
                      : "Ofline"}
                  </small>
                </div>
              </Box>
              <Box className="message-center__body">
                {messages.length > 0 &&
                  messages.map((message) => (
                    <div ref={scrollRef} key={message._id}>
                      <MessageText
                        owner={message.sender._id === user._id ? true : false}
                        message={message}
                      />
                    </div>
                  ))}
              </Box>
              <Box className="message-center__footer">
                <MessageForm
                  conversationId={conversationSelected.id}
                  sender={user?._id}
                  receiverId={conversationSelected.user?._id}
                  socket={socket}
                />
              </Box>
            </>
          ) : (
            <Box className="message-center__alert">
              <p>Mở một cuộc hội thoại để bắt đầu chat</p>
            </Box>
          )}
        </Grid>
        <Grid item xs={3} className="message-rightbar">
          {conversationSelected.user && (
            <>
              <div className="message-rightbar__title">
                <p>Thông tin</p>
              </div>
              <Box className="message-rightbar__media">
                <img
                  src={
                    conversationSelected.user?.coverPicture
                      ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${conversationSelected.user?.coverPicture}`
                      : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/nocover2.jpg`
                  }
                  alt="coverimg"
                  className="message-rightbar__media--cover"
                />
                <Avatar
                  className="message-rightbar__media--profile"
                  src={
                    conversationSelected.user?.profilePicture
                      ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${conversationSelected.user?.profilePicture}`
                      : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                  }
                />
              </Box>
              <Box className="message-rightbar__info">
                <Link to={`/profile/${conversationSelected.user?._id}`}>
                  <p>{conversationSelected.user?.username}</p>
                </Link>
                <small>{conversationSelected.user?.email}</small>
              </Box>
              <Box className="message-rightbar__about">
                <Box className="message-rightbar__about--box">
                  <BsGenderFemale
                    style={{
                      fontSize: "23px",
                      color: "var(--color-gray-shade)",
                    }}
                  />
                  <div className="message-rightbar__about--box-desc">
                    <p>Giới tính</p>
                    <small>
                      {conversationSelected.user?.relationship
                        ? returnRelationship(
                            conversationSelected.user?.relationship
                          )
                        : "Chưa xác định"}
                    </small>
                  </div>
                </Box>
                <Box className="message-rightbar__about--box">
                  <BsPersonCheck
                    style={{
                      fontSize: "23px",
                      color: "var(--color-gray-shade)",
                    }}
                  />
                  <div className="message-rightbar__about--box-desc">
                    <p>Đang theo dõi</p>
                    <small className="small-style">
                      {conversationSelected.user?.followers.length} followers
                    </small>
                  </div>
                </Box>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </WrapperMessageStyled>
  );
};

export default Message;

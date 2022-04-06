import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { ConversationContext } from "../../context/conversationContext";
import { MessageFormStyled } from "./MessageBodyStyled";
import { BsChat } from "react-icons/bs";
const MessageForm = ({ conversationId, sender, receiverId, socket }) => {
  const [text, setText] = useState("");
  const { sendMessage } = useContext(ConversationContext);
  const onHandleSendMessage = (e) => {
    setText(e.target.value);
  };
  const onSubmitSendMessage = async (e) => {
    e.preventDefault();
    if (text) {
      const response = await sendMessage({ text, conversationId, sender });
      if (response.success) {
        socket.current.emit("sendMessage", {
          message: response.message,
          receiverId,
        });
      }
    }
    setText("");
  };
  return (
    <MessageFormStyled>
      <form className="message-form" onSubmit={onSubmitSendMessage}>
        <input
          placeholder="Nhập tin nhắn ..."
          onChange={onHandleSendMessage}
          value={text}
        />
        <Button variant="contained" type="submit" className="message-form__btn">
          <BsChat />
        </Button>
      </form>
    </MessageFormStyled>
  );
};

export default MessageForm;

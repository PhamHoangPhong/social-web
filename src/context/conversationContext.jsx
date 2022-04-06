import { createContext, useReducer, useState } from "react";
import messageApi from "../api/messageApi";
import {
  CREATE_CONVERSATION,
  GET_CONVERSATION,
  GET_MESSAGE,
  SEND_MESSAGE,
} from "../reducer";
import conversationReducer from "../reducer/conversationReducer";

export const ConversationContext = createContext();

const ConversationContextProvider = ({ children }) => {
  const [conversationState, dispatch] = useReducer(conversationReducer, {
    conversations: [],
    messages: [],
    conversationLoading: true,
  });
  const [conversationSelected, setConversationSelected] = useState({
    id: "",
    user: null,
    members: []
  });

  const getConversations = async () => {
    try {
      const response = await messageApi.getConversations();
      if (response.success) {
        dispatch({
          type: GET_CONVERSATION,
          payload: response.conversations,
        });
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };
  const getMessages = async (id) => {
    try {
      const response = await messageApi.getMessage(id);
      if (response.success) {
        dispatch({
          type: GET_MESSAGE,
          payload: response.messages,
        });
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };

  const sendMessage = async (params) => {
    try {
      const response = await messageApi.sendMessage(params);
      if (response.success) {
        dispatch({
          type: SEND_MESSAGE,
          payload: response.message,
        });
      }
      return response
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };
  const createConversation = async (id) => {
    try {
      const response = await messageApi.createConversation(id);
      if (response.success) {
        dispatch({
          type: CREATE_CONVERSATION,
          payload: {
            newConversation: response.newConversation,
            checkNewConversation: response.checkNewConversation,
          },
        });
      }
      return response;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error };
    }
  };

  const conversationContextData = {
    conversationState,
    dispatch,
    getConversations,
    getMessages,
    sendMessage,
    createConversation,
    conversationSelected,
    setConversationSelected,
  };

  return (
    <ConversationContext.Provider value={conversationContextData}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;

import {
  CREATE_CONVERSATION,
  GET_CONVERSATION,
  GET_MESSAGE,
  SEND_MESSAGE,
  UPDATE_MESSAGE,
} from ".";

const conversationReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CONVERSATION:
      return {
        ...state,
        conversations: payload,
        conversationLoading: false,
      };
    case GET_MESSAGE:
      return {
        ...state,
        conversationLoading: false,
        messages: payload,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        conversationLoading: false,
        messages: [...state.messages, payload],
      };
    case CREATE_CONVERSATION:
      const conversations = payload.newConversation
        ? [payload.newConversation, ...state.conversations]
        : state.conversations;
      return {
        ...state,
        conversations: conversations,
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    default:
      return state;
  }
};

export default conversationReducer;

import "./App.css";
import RouteLanding from "./routing/RouteLanding";
import AuthContextProvider from "./context/authContext";
import UserContextProvider from "./context/userContext";
import PostContextProvider from "./context/postContext";
import ConversationContextProvider from "./context/conversationContext";
import { SocketContext, socket } from "./context/socketContext";
function App() {
  return (
    <AuthContextProvider>
      <SocketContext.Provider value={socket}>
        <UserContextProvider>
          <PostContextProvider>
            <ConversationContextProvider>
              <RouteLanding />
            </ConversationContextProvider>
          </PostContextProvider>
        </UserContextProvider>
        </SocketContext.Provider>
    </AuthContextProvider>
  );
}

export default App;

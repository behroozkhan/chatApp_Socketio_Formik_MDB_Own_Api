/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import UserImage from "../images/user-icon.png";
import UserImage1 from "../images/goku black.jpg";
import {
  MainContainer,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  MessageList,
  TypingIndicator,
  MessageSeparator,
  Message,
  MessageInput,
  ExpansionPanel,
} from "@chatscope/chat-ui-kit-react";
import DrawerAppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Image1 from "../images/goku black.jpg";
import { io } from "socket.io-client";

const Chat = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  // state managing here
  const [conversation, setConversation] = useState([]);
  const [messages, setMessage] = useState({});
  const [users, setUsers] = useState([]);
  const [messageInputValue, setMessageInputValue] = useState("");
  const userNavigate = useNavigate();
  const [currentConversation, setCurrentConversation] = useState(null);

  const socket = io("http://localhost:8000");

  const isAuthenticated = !!localStorage.getItem("userToken");

  // geeting conversatoin here
  useEffect(() => {
    const getUserConversations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        const response = await axios(
          `http://localhost:8000/api/conversation/${user?._id}`
        );
        console.log("Response Data:etUserConversation", response);
        setConversation(response.data);
      } catch (error) {
        console.error("Error fetching user conversations:", error);
      }
    };
    getUserConversations();
  }, []);

  //  Getting message here
  const gettingMessages = async (conversationId, user) => {
    console.log("conversationId93==>", conversationId);
    const responseMessage = await axios(
      `http://localhost:8000/api/conversation/messages/${conversationId}`
    );

    console.log("responseMessageGettingMessage", responseMessage.data);

    setMessage({
      messages: responseMessage.data,
      receiver: user,
      conversationId,
    });
    setCurrentConversation(user);
  };

  // handleMessage Here
  const sendMessages = async () => {
    const messageText = messageInputValue;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/conversation/messages",
        {
          conversationId: messages?.conversationId,
          senderId: user._id,
          message: messageText,
          receiverId: messages?.receiver?.receiverId,
        }
      );
      socket.emit("add-message", {
        conversationId: messages?.conversationId,
        senderId: user._id,
        message: messageText,
        receiverId: messages?.receiver?.receiverId,
      });
      console.log("response SENDMESSAGES API ==>", response);
      setMessageInputValue("");

      console.log("New message sent:", response);
    } catch (error) {
      console.error("Error sending the message:", error);
    }
  };

  useEffect(() => {
    const gettingAllUsers = async () => {
      const existingUser = await axios(
        "http://localhost:8000/api/conversation/users"
      );
      console.log("existingAllUser133", existingUser.data.allUsers);
      setUsers(existingUser.data.allUsers);
    };
    gettingAllUsers();
  }, [user]);

  // create new Conversation Using SenderID And RecieverId.
  const createNewConversation = async (email, name, _id, user) => {
    const senderId = user._id;
    const receiverId = _id;
    console.log("userId", senderId, "ClientId", receiverId);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/conversation/conver",
        { senderId, receiverId }
      );
      console.log("Response Data:NewConversation", response);
      console.log("userId", senderId, "senderId", receiverId);
      setConversation(response);
    } catch (error) {
      console.error("Error fetching user conversations:", error);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket_id", socket.id);
    });
  }, [socket]);

  useEffect(() => {
    // Set up a listener for incoming messages
    socket.on("send-message", (data) => {
      // Add the received message to your state
      setMessage((prevMessages) => ({
        ...prevMessages,
        messages: [...prevMessages.messages, data],
      }));
    });
  }, []);

  // ... (rest of your code)

  //checking User Auth Or Not Other Wise Redirect Login Page
  if (!isAuthenticated) {
    userNavigate("/login");
    return null;
  }

  return (
    <div>
      <DrawerAppBar />
      <div
        style={{
          height: "640px",
          position: "relative",
        }}
      >
        <MainContainer responsive>
          <Sidebar position="left" scrollable={false}>
            {
              <Conversation name={user.name}>
                <Avatar
                  src={UserImage}
                  name="Behrooz Khan"
                  status="unavailable"
                />
              </Conversation>
            }
            <Search placeholder="Search..." />

            <ConversationList>
              {conversation.length > 0 ? (
                conversation.map(({ conversationId, user }) => {
                  return (
                    <Conversation
                      onClick={() => {
                        gettingMessages(conversationId, user);
                      }}
                      key={conversationId}
                      name={user.name}
                      lastSenderName="behrooz"
                      info={user.email}
                    >
                      <Avatar src={UserImage} name="Joe" status="dnd" />
                    </Conversation>
                  );
                })
              ) : (
                <div>No Conversation Yet</div>
              )}
            </ConversationList>
          </Sidebar>

          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar
                src={UserImage}
                name={currentConversation ? currentConversation.name : "Zoe"}
              />
              <ConversationHeader.Content
                userName={currentConversation ? currentConversation.name : ""}
                info={currentConversation ? currentConversation.email : ""}
              />
              <ConversationHeader.Actions>
                <VoiceCallButton />
                <VideoCallButton />
                <InfoButton />
              </ConversationHeader.Actions>
            </ConversationHeader>

            <MessageList
              typingIndicator={
                <TypingIndicator content="Behrooz Khan  is typing" />
              }
            >
              {messages.messages && messages.messages.length > 0 ? (
                messages.messages &&
                messages.messages.map(
                  ({ message, user: { receiverId, name, email } = {} }) => (
                    <Message
                      key={receiverId}
                      model={{
                        message: message,
                        sentTime: "15 mins ago",
                        sender: name,
                        info: email,
                        direction:
                          receiverId === receiverId ? "incoming" : "outgoing",
                        position: "single",
                      }}
                    >
                      <Avatar src={UserImage} name={name} />
                    </Message>
                  )
                )
              ) : (
                <div>No Conversation Yet</div>
              )}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              value={messageInputValue}
              onChange={(val) => setMessageInputValue(val)}
              onSend={() => sendMessages()}
            />
          </ChatContainer>

          <Sidebar position="right">
            <ConversationList className="mt-2">
              {users.length > 0 ? (
                users.map(({ name, email, _id }) => {
                  return (
                    <Conversation
                      className="mb-1"
                      onClick={() => {
                        createNewConversation(email, name, _id, user);
                      }}
                      key={_id}
                      name={name}
                      lastSenderName="behrooz"
                      info={email}
                    >
                      <Avatar src={UserImage} name="Joe" status="dnd" />
                    </Conversation>
                  );
                })
              ) : (
                <div>No Conversation Yet</div>
              )}
            </ConversationList>
          </Sidebar>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chat;
{
  /* <MessageSeparator content="Saturday, 30 November 2019" /> */
}
{
  /* {message.map(({ message, user: { id, name } = {} }) => {
                  console.log(user);
                  if (id === user?.id) {
                    // Check if the message sender's ID matches the user's ID
                    console.log("idif", id);
                    return (
                      <Message
                        key={id}
                        model={{
                          message: message,
                          sentTime: "15 mins ago",
                          sender: name,
                          direction: "incoming",
                          position: "single",
                        }}
                      >
                        <Avatar src={UserImage} name={name} />
                      </Message>
                    );
                  } else {
                    console.log("idelse", id);
                    return (
                      <Message
                        key={id}
                        model={{
                          message: message,
                          sentTime: "15 mins ago",
                          sender: name,
                          direction: "outgoing",
                          position: "single",
                        }}
                      >
                        <Avatar src={UserImage1} name={name} />
                      </Message>
                    );
                  }
                })} */
}

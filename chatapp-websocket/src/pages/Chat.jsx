/* eslint-disable no-unused-vars */
import { useState } from 'react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import UserImage from '../images/user-icon.png'
import {MainContainer,Sidebar,Search,ConversationList,Conversation,Avatar,ChatContainer,ConversationHeader,VoiceCallButton,
  VideoCallButton,InfoButton,MessageList,TypingIndicator,MessageSeparator,Message,MessageInput,ExpansionPanel



} from '@chatscope/chat-ui-kit-react'
import DrawerAppBar from '../components/AppBar';





const Chat = () => {
  const [messageInputValue, setMessageInputValue] = useState("");


  return (
    <div>
  <DrawerAppBar/>
<div style={{
    height: "640px",
    position: "relative",
    top:"4em"
  }}>
              <MainContainer responsive>                                   
                <Sidebar position="left" scrollable={false}>
                <Conversation name="Behrooz Khan" >
                      <Avatar src={UserImage} name="Behrooz Khan" status="unavailable" />
                    </Conversation>
                  <Search placeholder="Search..." />
                  <ConversationList>                                                     
                    <Conversation name="Hasnain Khan" lastSenderName="Lilly" info="Yes i can do it for you">
                      <Avatar src={UserImage} name="behrooz" status="available" />
                    </Conversation>
                    
                    <Conversation name="Arman khan" lastSenderName="behrooz" info="Yes i can do it for you">
                      <Avatar src={UserImage} name="Joe" status="dnd" />
                    </Conversation>
                    
                    <Conversation name="Gohan" lastSenderName="behrooz" info="Yes i can do it for you" unreadCnt={3}>
                      <Avatar src={UserImage} name="Emily" status="available" />
                    </Conversation>
                    
                    <Conversation name="Khabib" lastSenderName="behrooz" info="Yes i can do it for you" unreadDot>
                      <Avatar src={UserImage} name="Kai" status="unavailable" />
                    </Conversation>
                                
                    <Conversation name="Tom Cruise" lastSenderName="behrooz" info="Yes i can do it for you" unreadDot>
                      <Avatar src={UserImage} name="Kai" status="unavailable" />
                    </Conversation>
                                
                    <Conversation name="Monkey De Luffy" lastSenderName="behrooz" info="Yes i can do it for you" unreadDot>
                      <Avatar src={UserImage} name="Kai" status="unavailable" />
                    </Conversation>
                                
                    <Conversation name="Vegita" lastSenderName="behrooz" info="Yes i can do it for you">
                      <Avatar src={UserImage} name="Akane" status="eager" />
                    </Conversation>
                                        
                    <Conversation name="Ittachi Ucchiha" lastSenderName="behrooz" info="Yes i can do it for you">
                      <Avatar src={UserImage} name="Eliot" status="away" />
                    </Conversation>
                                                        
                    <Conversation name="Saturo Gojo" lastSenderName="behrooz" info="Yes i can do it for you" active>
                      <Avatar src={UserImage} name="Zoe" status="dnd" />
                    </Conversation>
                    
                    <Conversation name="Black Goku" lastSenderName="behrooz" info="Yes i can do it for you">
                      <Avatar src={UserImage} name="Black Goku" status="invisible" />
                    </Conversation>
                                                                             
                  </ConversationList>
                </Sidebar>
                  
                <ChatContainer>
                  <ConversationHeader>
                    <ConversationHeader.Back />
                    <Avatar src={UserImage} name="Zoe" />
                    <ConversationHeader.Content userName="Ittachi Ucchiha" info="Active 10 mins ago" />
                    <ConversationHeader.Actions>
                      <VoiceCallButton />
                      <VideoCallButton />
                      <InfoButton />
                    </ConversationHeader.Actions>          
                  </ConversationHeader>
                  <MessageList typingIndicator={<TypingIndicator content="Behrooz Khan  is typing" />}>
                    
                    <MessageSeparator content="Saturday, 30 November 2019" />
                    
                    <Message model={{
            message: "Fear Is A Tool",
            sentTime: "15 mins ago",
            sender: "Zoe",
            direction: "incoming",
            position: "single"
          }}>
                      <Avatar src={UserImage} name="Zoe" />
                    </Message>
                    
                    <Message model={{
            message: "Yes I know",
            sentTime: "15 mins ago",
            sender: "Patrik",
            direction: "outgoing",
            position: "single"
          }} avatarSpacer />
                    <Message model={{
            message: "When That Light",
            sentTime: "15 mins ago",
            sender: "Zoe",
            direction: "incoming",
            position: "first"
          }} avatarSpacer />
                    <Message model={{
            message: "Hit The Sky is",
            sentTime: "15 mins ago",
            sender: "Zoe",
            direction: "incoming",
            position: "normal"
          }} avatarSpacer />
                    <Message model={{
            message: "Not Just A Call",
            sentTime: "15 mins ago",
            sender: "Zoe",
            direction: "incoming",
            position: "normal"
          }} avatarSpacer />
                    <Message model={{
            message: "Its A Warning To Them",
            sentTime: "15 mins ago",
            sender: "Zoe",
            direction: "incoming",
            position: "last"
          }}>
                      <Avatar src={UserImage} name="Zoe" />
                    </Message>
                    
                    <Message model={{
            message: "Ohh Yeah Really",
            sentTime: "15 mins ago",
            sender: "Patrik",
            direction: "outgoing",
            position: "first"
          }} />
                    <Message model={{
            message: "They Think I'Am",
            sentTime: "15 mins ago",
            sender: "Patrik",
            direction: "outgoing",
            position: "normal"
          }} />
                    <Message model={{
            message: "Hidding The Shadows",
            sentTime: "15 mins ago",
            sender: "Patrik",
            direction: "outgoing",
            position: "normal"
          }} />
                    <Message model={{
            message: "But I'M The Shadows",
            sentTime: "15 mins ago",
            sender: "Patrik",
            direction: "outgoing",
            position: "last"
          }} />
                    
                    <Message model={{
            message: "Ya Yaa",
            sentTime: "15 mins ago",
            sender: "Zoe",
            direction: "incoming",
            position: "first"
          }} avatarSpacer />                                          
                    <Message model={{
            message: "I Am The Ghost Of The Ucchiha",
            sentTime: "15 mins ago",
            sender: "Zoe",
            direction: "incoming",
            position: "last"
          }}>
                      <Avatar src={UserImage} name="Zoe" />
                    </Message>
                  </MessageList>
                  <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={() => setMessageInputValue("")} />
                </ChatContainer>
                
                  <Sidebar position="right">
                    <ExpansionPanel open title="INFO">
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="LOCALIZATION">
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="MEDIA">
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="SURVEY">
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="OPTIONS">
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                      <p>Lorem ipsum</p>
                    </ExpansionPanel>
                  </Sidebar>            
              </MainContainer>
            </div>;

    </div>
  )
}

export default Chat;
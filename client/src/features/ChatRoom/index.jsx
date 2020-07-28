import React from "react";
import Chat from "../Chat";
import MessageForm from "../MessageForm";
import NavBar from "../NavBar";
import UserList from "../UserList";
import VideoPanel from "../VideoPanel";

const ChatRoom = () => {
  return (
    <div className="chatRoom">
      <NavBar />
      <div className="mainContent">
        <UserList />
        <main>
          <Chat />
          <MessageForm />
        </main>
        <VideoPanel />
      </div>
    </div>
  );
};

export default ChatRoom;

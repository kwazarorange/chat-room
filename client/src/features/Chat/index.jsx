import React from "react";
import { useSelector } from "react-redux";
import { MessageFactory } from "../Message";

// Component that displays messages
const Chat = () => {
  const messages = useSelector((state) => state.messages).map((message) =>
    MessageFactory(message)
  );

  return <div className="chat">{messages}</div>;
};

export default Chat;

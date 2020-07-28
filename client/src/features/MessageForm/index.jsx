import React, { useState, useContext } from "react";
import { SocketContext } from "./../SocketProvider";
import TextArea from "./TextArea";

// Component that display form to send messages
const MessageForm = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      sendMessage(message);
      setMessage("");
    }
  };
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <TextArea state={message} setState={setMessage} submit={handleSubmit} />
      <input className="button" type="submit" value="Send" disabled={!message} />
    </form>
  );
};

export default MessageForm;

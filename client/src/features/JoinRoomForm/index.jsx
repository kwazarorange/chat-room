import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import ConnectionStatus from "../ConnectionStatus";
import { nanoid } from "nanoid";

import { SocketContext } from "./../SocketProvider";

// Component that allows user to join a room
const JoinRoomForm = () => {
  const { joinRoom } = useContext(SocketContext);
  const { status, username, room } = useSelector((state) => state.connection);
  const [name, setName] = useState(username);
  // Room name from url or random
  const [urlRoom, setRoom] = useState(useParams().id || nanoid());
  const isConnecting = status === "connecting";

  const handleSubmit = (e) => {
    e.preventDefault();
    joinRoom({ username: name, room: urlRoom });
  };

  // If user has been connected and room string is in redux state
  // redirect to the chat component
  if (status === "connected" && room && username) {
    return <Redirect to={`/chat/${room}`} />;
  }
  return (
    <form onSubmit={handleSubmit} className="joinRoomForm">
      <label>Name:</label>
        <input
          type="text"
          required
          minLength="5"
          maxLength="15"
          disabled={isConnecting}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      <label>Room:</label>
        <input
          type="text"
          value={urlRoom}
          minLength="5"
          maxLength="15"
          disabled={isConnecting}
          onChange={(e) => setRoom(e.target.value)}
        />
      <ConnectionStatus />
      <input className="button green" type="submit" disabled={isConnecting} value="Join" />
    </form>
  );
};

export default JoinRoomForm;

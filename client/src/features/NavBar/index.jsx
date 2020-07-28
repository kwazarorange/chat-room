import React, {useContext} from "react";
import { useSelector } from "react-redux";
import ConnectionStatus from "../ConnectionStatus";
import { SocketContext } from "./../SocketProvider";

// Component that displays room name, username, connection status and button to
// leave the room
const NavBar = () => {
  const { leaveRoom } = useContext(SocketContext);
  const { room, username } = useSelector((state) => state.connection);

  return (
    <div className="navBar">
      <h3>{room}</h3>
      <h3>{username}</h3>
      <ConnectionStatus />
      <button className="button red" onClick={() => leaveRoom({ room })}>Leave</button>
    </div>
  );
};

export default NavBar;

import React, { createContext } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  connect,
  connectSuccess,
  connectFailure,
  reconnect,
  disconnect,
  joinRoom,
  joinRoomSuccess,
  leaveRoom,
  updateUsers,
} from "../../store/connectionSlice";
import {
  sendMessage,
  changeMessageStatus,
  receiveMessage,
  removeMessages
} from "../../store/messagesSlice";
import { nanoid } from "nanoid";

const SocketContext = createContext(null);
export { SocketContext };

// HOC that provides and manages Socket.io connection
export default ({ children }) => {
  let socket;
  let ws;
  const dispatch = useDispatch();

  dispatch(connect());
  socket = io(`${window.location.hostname}:8080`);
  socket.on("connect", () => {
    dispatch(connectSuccess());
  });
  socket.on("connect_error", (error) => {
    dispatch(connectFailure({ message: "not connected" }));
  });
  socket.on("reconnecting", () => {
    dispatch(reconnect());
  });
  socket.on("reconnect_failed", () => {
    dispatch(disconnect());
  });
  socket.on("disconnect", (reason) => {
    // if server or client explicitly disconnect dispatch disconnect
    if (
      reason === "io client disconnect" ||
      reason === "io server disconnect"
    ) {
      dispatch(disconnect());
    } else {
      dispatch(connectFailure({ message: "not connected" }));
    }
  });
  socket.on("update-users", (users) => {
    dispatch(updateUsers(users));
  });
  socket.on("chat-message", (payload) => {
    dispatch(receiveMessage(payload));
  });
  socket.on("server-message", (message) => {
    dispatch(
      receiveMessage({ id: nanoid(), message, user: "server", time: null })
    );
  });

  const ioJoinRoom = ({ username, room }) => {
    dispatch(joinRoom({ username }));
    socket.emit(
      "join-room",
      { username, room },
      ({ status, room, position }) => {
        if (status === "success") {
          dispatch(joinRoomSuccess({ room, position }));
        } else {
          dispatch(connectFailure("not connected"));
          dispatch(disconnect());
        }
      }
    );
  };
  const ioLeaveRoom = ({ room }) => {
    dispatch(leaveRoom({ room }));
    dispatch(removeMessages());
    socket.emit("leave-room", room);
  };
  const ioSendMessage = (message) => {
    const id = nanoid();
    dispatch(sendMessage({ id, message }));
    socket.emit("chat-message", { id, message }, ({ status }) => {
      dispatch(changeMessageStatus({ id, status }));
    });
  };

  ws = {
    socket: socket,
    joinRoom: ioJoinRoom,
    leaveRoom: ioLeaveRoom,
    sendMessage: ioSendMessage,
  };
  return (
    <SocketContext.Provider value={ws}>
      {ws.socket ? children : <p>loading</p>}
    </SocketContext.Provider>
  );
};

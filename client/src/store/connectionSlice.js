import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: { status: "not connected", username: "", room: "", users: [] },
  reducers: {
    connect(state, action) {
      state.status = "connecting";
    },
    reconnect(state, action) {
      state.status = "reconnecting";
    },
    connectSuccess(state, action) {
      state.status = "connected";
    },
    connectFailure(state, action) {
      const { message } = action.payload;
      state.status = message;
    },
    disconnect(state, action) {
      state.status = "not connected";
      state.room = "";
    },
    joinRoom(state, action) {
      const { username } = action.payload;
      state.username = username;
    },
    joinRoomSuccess(state, action) {
      const { room, position } = action.payload;
      state.room = room;
      state.position = position;
    },
    leaveRoom(state, action) {
      state.room = "";
    },
    updateUsers(state, action) {
      const users = action.payload;
      state.users = users;
    }
  },
});

const { actions, reducer } = connectionSlice;
export const {
  connect,
  connectSuccess,
  connectFailure,
  reconnect,
  disconnect,
  joinRoom,
  joinRoomSuccess,
  leaveRoom,
  updateUsers
} = actions;
export default reducer;

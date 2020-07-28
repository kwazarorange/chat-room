import { createSlice } from "@reduxjs/toolkit";
import formatTime from '../utils/formatTime';

const messagesSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    sendMessage: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: ({ id, message }) => {
        const date = formatTime(new Date());
        return { payload: { id, user: "own", message, date, status: "sent" } };
      },
    },
    changeMessageStatus: (state, action) => {
      const { id, status } = action.payload;
      return state.map((message) => {
        if (message.id === id) return { ...message, status };
        return message;
      });
    },
    receiveMessage: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: ({ id, message, user, time }) => {
        const date = formatTime(time);
        return { payload: { id, user, message, date } };
      },
    },
    removeMessages: (state, action) => {
      return [];
    }
  },
});

const { actions, reducer } = messagesSlice;
export const { sendMessage, changeMessageStatus, receiveMessage, removeMessages } = actions;
export default reducer;

import connection from './connectionSlice';
import messages from './messagesSlice';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    connection: connection,
    messages: messages
  },
});

export default store;

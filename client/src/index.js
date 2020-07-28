import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import SocketProvider from "./features/SocketProvider/";
import './scss/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

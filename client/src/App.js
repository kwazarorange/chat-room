import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import JoinRoomForm from "./features/JoinRoomForm";
import ChatRoom from "./features/ChatRoom";

// Route that redirects client to the login form if he hasn't joined the room
function PrivateRoute({ children, ...rest }) {
  const { room, username } = useSelector((state) => state.connection);
  return (
    <Route
      {...rest}
      render={({ match, location }) =>
        room && username ? (
          children
        ) : (
          <Redirect to={`/join/${match.params.id}`} />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path={["/join/:id", "/join/"]}>
            <JoinRoomForm />
          </Route>
          <PrivateRoute path={["/chat/:id"]}>
            <ChatRoom />
          </PrivateRoute>
          <Route path="/">
            <Redirect to="/join/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

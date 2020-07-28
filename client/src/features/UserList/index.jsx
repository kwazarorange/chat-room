import React from "react";
import { useSelector } from "react-redux";

// Component that lists users of the room
const UserList = () => {
  const users = useSelector((state) => state.connection.users).map((user) => (
    <li key={user.id}>{user.name}</li>
  ));
  return (
    <aside>
      <h3>Users</h3>
      <ul>
        {users}
      </ul>
    </aside>
  );
};

export default UserList;

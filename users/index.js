const users = [];

// Adds user to the array or replaces existing record
function join(id, name, room) {
  // If room is empty, then use id as a room
  const user = { id, name, room: room || id };
  // Check if user exists
  const userIndex = index(id);
  // If user exists, replace old record
  if (userIndex >= 0) {
    users[userIndex] = user;
  } else {
    users.push(Object.assign({}, user, { position: users.length }));
  }
  return get(id);
}

function get(id) {
  return users.find((user) => user.id === id);
}

function joinConference(id) {
  const userIndex = index(id);
  if (userIndex >= 0) {
    users[userIndex].inConference = true;
    return true;
  } else {
    return false;
  }
}

function leaveConference(id) {
  const userIndex = index(id);
  if (userIndex >= 0) {
    users[userIndex].inConference = false;
    return true;
  } else {
    return false;
  }
}
function index(id) {
  return users.findIndex((user) => user.id === id);
}

// Removes user record from array
function leave(id) {
  const userIndex = index(id);
  if (userIndex >= 0) {
    return users.splice(userIndex, 1)[0];
  } else return false;
}

// Lists all users in a room
function list(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  join,
  leave,
  list,
  get,
  joinConference,
  leaveConference,
};

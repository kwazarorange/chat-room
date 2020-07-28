const users = require("../users");
const os = require("os");

module.exports = (server) => {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    socket.on("join-room", ({ username, room }, ack) => {
      // Create a User record
      const user = users.join(socket.id, username, room);
      // Add socket to the room
      socket.join(user.room);
      // Callback with status and room
      ack({ status: "success", room: user.room, position: user.position });
      io.to(room).emit("server-message", `${user.name} has joined the room`);
      // Send updates list of users to the room
      io.to(room).emit("update-users", users.list(user.room));
    });

    socket.on("chat-message", ({ id, message }, ack) => {
      const user = users.get(socket.id);
      if (user) {
        // Acknowdedging that message had been received
        ack({ status: "received" });
        // Emit message to the room
        socket.to(user.room).emit("chat-message", {
          id,
          message,
          user: user.name,
          time: Date.now(),
        });
      } else {
        ack({ status: "error" });
      }
    });
    socket.on("leave-room", (room) => {
      socket.leave(room);
      // Remove users record
      const user = users.leave(socket.id);
      if (user)
        io.to(room).emit("server-message", `${user.name} has left the room`);
      io.to(user.room).emit("update-users", users.list(user.room));
    });
    // NOTE: disconnect and leave-room are doing the same thing
    socket.on("disconnect", () => {
      // Remove users record
      const user = users.leave(socket.id);
      if (user) {
        io.to(user.room).emit(
          "server-message",
          `${user.name} has left the room`
        );
        io.to(user.room).emit("update-users", users.list(user.room));
      }
    });
    socket.on("ice-candidate", ({ to, label, candidate }) => {
      socket
        .to(to)
        .emit("ice-candidate", { from: socket.id, label, candidate });
    });
    socket.on("join-conference", () => {
      users.joinConference(socket.id);
      const user = users.get(socket.id);
      io.to(user.room).emit("update-users", users.list(user.room));
    });
    socket.on("leave-conference", () => {
      users.leaveConference(socket.id);
      const user = users.get(socket.id);
      io.to(user.room).emit("update-users", users.list(user.room));
    });
    socket.on("offer", ({ to, sdp }) => {
      socket.to(to).emit("offer", { from: socket.id, sdp });
    });
    socket.on("ready", ({ to }) => {
      socket.to(to).emit("ready", { from: socket.id });
    });
    socket.on("answer", ({ to, sdp }) => {
      socket.to(to).emit("answer", { from: socket.id, sdp });
    });
  });

  return io;
};

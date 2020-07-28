import React, { useState } from "react";

// Component that manages local MediaStream and emits users conference status
// props are:
// @param {object} socket Socket instance
// @param {object} stream Local MediaStream
// @param {func} setStream Used to set stream state

const ConferenceButton = ({ socket, stream, setStream }) => {
  const [inConference, setInConference] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const label = inConference ? "Leave Conference" : "Join Conference";

  // gets users MediaStream, sets it to the stream state
  // and emits message that user has joined the conference
  const handleJoin = (e) => {
    e.preventDefault();
    setDisabled(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => setStream(stream))
      .then(socket.emit("join-conference"))
      .then(() => {
        setInConference(true);
        setDisabled(false);
      });
  };

  // stops the MediaStream, sets stream state to null
  // emits message that user has left the conference
  const handleLeave = (e) => {
    e.preventDefault();
    setDisabled(true);
    socket.emit("leave-conference");
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    setStream(null);
    setInConference(false);
    setDisabled(false);
  };

  return (
    <button className={`button ${inConference ? `red` : `green`}`}
      disabled={disabled}
      onClick={inConference ? handleLeave : handleJoin}
    >
      {label}
    </button>
  );
};

export default ConferenceButton;

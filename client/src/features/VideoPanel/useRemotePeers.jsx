import React, { useState, useEffect } from 'react';
import { WebRTCVideo } from '../Video';



// Custom hook that manages WebRTCVideo components
//
// @param {object} stream Local MediaStream
// @param {array} users Array of users in a room
// @param {object} socket Socket instance

const useRemotePeers = (stream, users, socket) => {
  const [remotePeers, setRemotePeers] = useState([]);

  useEffect(() => {
    if (stream) {
      // setRemotePeers to:
      // - previous components that still have a corresponding user
      //   with status 'calling'
      // - new components for users that do not have corresponding components
      //   and have a status 'calling'
      setRemotePeers([
        ...remotePeers.filter((component) =>
          users.find(
            (user) =>
              user.id === component.props.id && user.inConference
          )
        ),
        ...users
          .filter(
            (user) =>
              !remotePeers.find(
                (component) => component.props.id === user.id
              ) &&
              user.id !== socket.id &&
              user.inConference
          )
          .map((user) => <WebRTCVideo key={user.id} localStream={stream} id={user.id} />),
      ]);
    } else {
      setRemotePeers([]);
    }
  }, [stream, users, socket]);

  return remotePeers;
}

export default useRemotePeers;

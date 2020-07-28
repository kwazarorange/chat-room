import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import Video from "../Video";
import ConferenceButton from "./ConferenceButton";
import { SocketContext } from "./../SocketProvider";
import useRemotePeers from './useRemotePeers';


// Component that manages WebRTCVideo components,
// gets and displays the local MediaStream
const VideoPanel = () => {
  const { socket } = useContext(SocketContext);
  const [stream, setStream] = useState(null);
  const { users } = useSelector((state) => state.connection);
  const remotePeers = useRemotePeers(stream, users, socket);

  return (
    <div className="videoPanel">
      <div className="videoPanelButtons">
        <ConferenceButton
          socket={socket}
          stream={stream}
          setStream={setStream}
        />
      </div>
      {stream ? (
        <div className="videos">
          <Video isMuted={true} stream={stream} />
          {remotePeers}
        </div>
      ) : null}
    </div>
  );
};

export default VideoPanel;

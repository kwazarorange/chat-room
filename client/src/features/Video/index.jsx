import React, { useEffect, useRef } from "react";
import WebRTCVideo from './WebRTCVideo';
import PropTypes from 'prop-types';
import "./index.scss";

// Component that displays MediaStream
// props are:
// @param {object} stream MediaStream

const Video = ({ stream }) => {
  const refVideo = useRef(null);

  useEffect(() => {
    if (refVideo.current) {
      refVideo.current.srcObject = stream;
    }
  }, [stream]);

  return <video autoPlay={true} ref={refVideo}></video>;
};

Video.propTypes = {
  stream: PropTypes.object,
}

export default Video;
export { WebRTCVideo };

import React, { useEffect, useRef } from "react";
import WebRTCVideo from './WebRTCVideo';
import PropTypes from 'prop-types';

// Component that displays MediaStream
// props are:
// @param {object} stream MediaStream
// @param {boolean} isMuted
const Video = ({ stream, isMuted=false }) => {
  const refVideo = useRef(null);

  useEffect(() => {
    if (refVideo.current) {
      refVideo.current.srcObject = stream;
    }
  }, [stream]);

  return <video muted={isMuted} autoPlay={true} ref={refVideo}></video>;
};

Video.propTypes = {
  stream: PropTypes.object,
}

export default Video;
export { WebRTCVideo };

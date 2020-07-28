import React from "react";
import { SocketContext } from "./../SocketProvider";
import Video from "./";
import PropTypes from "prop-types";

// Free STUN servers provided by Google
const iceServers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
  ],
};

// HOC for Video that creates and manages WebRTC Connection
// props are:
// @param {object} localStream MediaStream from the users webcam
// @param {string} id Socket.id of the remote peer
class WebRTCVideo extends React.Component {
  static contextType = SocketContext;
  constructor(props, context) {
    super(props, context);
    this.socket = this.context.socket;
    this.rtc = new RTCPeerConnection(iceServers);
    this.state = { remoteStream: null };
  }
  componentDidMount() {
    this.rtc.onicecandidate = (e) => {
      if (e.candidate)
        this.socket.emit("ice-candidate", {
          to: this.props.id,
          label: e.candidate.sdpMLineIndex,
          candidate: e.candidate.candidate,
        });
    };
    this.rtc.ontrack = (e) => {
      this.setState({ remoteStream: e.streams[0] });
    };
    this.socket.on("offer", ({ from, sdp }) => {
      if (from === this.props.id) {
        this.rtc
          .setRemoteDescription(new RTCSessionDescription(sdp))
          .then(() => this.createAnswer());
      }
    });
    this.socket.on("answer", ({ from, sdp }) => {
      if (from === this.props.id) {
        this.rtc.setRemoteDescription(new RTCSessionDescription(sdp));
      }
    });
    this.socket.on("ice-candidate", ({ from, label, candidate }) => {
      if (from === this.props.id) {
        const cand = new RTCIceCandidate({
          sdpMLineIndex: label,
          candidate,
        });
        this.rtc
          .addIceCandidate(cand)
          .catch((e) => console.log(e));
      }
    });
    // When message that remote peer is ready to receive offers is received,
    // send an offer
    this.socket.on("ready", ({ from }) => {
      if (from === this.props.id) {
        this.createOffer();
      }
    });
    // Adding tracks from local stream to the WebRTC connection
    this.props.localStream.getTracks().forEach((track) => {
      this.rtc.addTrack(track, this.props.localStream);
    });
    // Signalling that component is ready to receive offers
    this.socket.emit("ready", { to: this.props.id });
  }
  componentWillUnmount() {
    this.rtc.close();
  }
  // Create WebRTC Answer, set local description and emit to the remote peer
  createAnswer = () => {
    this.rtc
      .createAnswer()
      .then((sessionDesc) => {
        this.rtc
          .setLocalDescription(sessionDesc)
          .then(() => {
            this.socket.emit("answer", {
              sdp: sessionDesc,
              to: this.props.id,
            });
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => {
        return e;
      });
  };
  // Create WebRTC Offer, set local description and emit to the remote peer
  createOffer = () => {
    this.rtc
      .createOffer()
      .then((sessionDesc) => {
        this.rtc.setLocalDescription(sessionDesc);
        this.socket.emit("offer", {
          sdp: sessionDesc,
          to: this.props.id,
        });
      })
      .catch((e) => {
        return e;
      });
  };
  render() {
    return <Video stream={this.state.remoteStream} />;
  }
}

WebRTCVideo.propTypes = {
  localStream: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default WebRTCVideo;

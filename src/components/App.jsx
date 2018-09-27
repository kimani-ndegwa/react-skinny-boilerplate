import React from "react";
import ReactDOM from "react-dom";
import SimpleWebRTC from "simplewebrtc";

const P2P = require("socket.io-p2p");
const io = require("socket.io-client");

import { BACKEND_URL, getItemFromLocalStorage } from "../../common";

// Components
import {Navigation} from "./Navigation";

let socket, webrtc, p2p;
export class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    socket = io(BACKEND_URL, { transports: ["websocket"] });
    p2p = new P2P(socket);
    webrtc = new SimpleWebRTC({
      localVideoEl: ReactDOM.findDOMNode(this.refs.local),
      remoteVideosEl: ReactDOM.findDOMNode(this.refs.remotes),
      autoRequestMedia: true,
      url: "http://localhost:3001"
    });
    webrtc.on("videoAdded", this.addVideo);
    webrtc.on("videoRemoved", this.removeVideo);
    webrtc.on('readyToCall', this.readyToCall);

    console.log("webrtc component mounted");
  }

  componentWillUnmount(){
    this.removeVideo();
  }

  addVideo = (video, peer) => {
    console.log("video added", peer);
    console.log(this.refs.remotes);
    const remotes = ReactDOM.findDOMNode(this.refs.remotes);
    console.log(remotes);
    if (remotes) {
      const container = document.createElement("div");
      container.className = "videoContainer";
      container.id = "container_" + this.webrtc.getDomId(peer);
      container.appendChild(video);
      // suppress contextmenu
      video.oncontextmenu = function() {
        return false;
      };
      console.log(container);
      remotes.appendChild(container);
    }
  }

  connect() {
    console.log("connected");
  }

  disconnect() {
    console.log("disconnected");
  }

  readyToCall() {
    // return webrtc.joinRoom('change-this-roomname');
  }

  removeVideo = (video, peer) => {
    console.log("video removed ", peer);
    const remotes = ReactDOM.findDOMNode(this.refs.remotes);
    const el = document.getElementById(peer ? 'container_' +       this.webrtc.getDomId(peer) : 'localScreenContainer');
    if (remotes && el) {
      remotes.removeChild(el);
    }
  }

  render() {
    return (
      <div className="app-ctn">
      <Navigation/>
      <div className="video-ctn">
      
        <video className="local" id="localVideo" ref="local" />
        <video className="remotes" id="remoteVideos" ref="remotes" />
      </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "../../node_modules/video-react/dist/video-react.css";
import {
  Player,
  PlaybackRateMenuButton,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  VolumeMenuButton,
} from "video-react";

const sources = {
  server1: "http://media.w3.org/2010/05/sintel/trailer.mp4",
  server2: "http://media.w3.org/2010/05/bunny/trailer.mp4",
};

export default class PlayerControl extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources.server1,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state,
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  load() {
    this.player.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.player.getState();
      this.player.seek(player.currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.player.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.playbackRate = player.playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.volume = player.volume + steps;
    };
  }

  changeSource(name) {
    return () => {
      this.setState({
        source: sources[name],
      });
      this.player.load();
    };
  }

  render() {
    return (
      <div className="items-center">
        <Player
          ref={(player) => {
            this.player = player;
          }}
          autoPlay
        >
          <source src={this.state.source} />
          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={10} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton
              rates={[2, 1.75, 1.5, 1.25, 1, 0.5, 0.1]}
              order={7.1}
            />
            <VolumeMenuButton />
          </ControlBar>
        </Player>
        <div className="pb-3 flex mt-2">
          <h2 className="text-lg text-red-700	p-0.5		">Server</h2>
          <button
            onClick={this.changeSource("server1")}
            className="ml-2	 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            SV1
          </button>
          <button
            onClick={this.changeSource("server2")}
            className="ml-2	bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            SV2
          </button>
        </div>
      </div>
    );
  }
}

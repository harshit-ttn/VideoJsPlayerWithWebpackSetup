import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    player: any;
    videojs: any;
  }
}

interface VideoPlayerProps {
  options: any;
  setVideoNode: any;
  playerViewData: any;
  setPlayerViewData: (arg: any) => void;
  setIsLoading: any;
}

const VideoJSPlayer: React.FC<VideoPlayerProps> = ({
  options,
  setVideoNode,
  playerViewData,
  setPlayerViewData,
  setIsLoading,
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  let player: any;

  const initialOptions: any = {
    controlBar: false,
    errorDisplay: false,
    textTrackSettings: false,
    bigPlayButton: false,
    loadingSpinner: false,
    posterImage: false,
  };

  console.log("......options.......", options);

  React.useEffect(() => {
    player = window.videojs(videoRef.current!, {
      ...initialOptions,
      controls: true,
      autoplay: true,
    });
    window.player = player;
    setVideoNode(videoRef);

    // Encrypted Media Extensions (EME or eme)
    player.eme(); // use only for encrypted files(DRM Contents)
    player.src(options);
    bindEvents();

    return () => {
      if (player) {
        player.dispose();
        setVideoNode("");
        window.player = null;
      }
    };
  }, [options?.src]);

  const bindEvents = () => {
    player.on("play", () => {
      setPlayerViewData((prevState: any) => ({
        ...prevState,
        playPauseState: "play",
      }));
    });

    player.on("pause", () => {
      setPlayerViewData((prevState: any) => ({
        ...prevState,
        playPauseState: "pause",
      }));
    });
    player.on("loadeddata", () => {
      setIsLoading(false);
    });

    player.on("seeking", () => {
      setIsLoading(true);
    });

    player.on("seeked", () => {
      setIsLoading(false);
    });
  };

  React.useEffect(() => {
    if (playerViewData.playPauseState === "play") {
      videoRef!.current!.play();
    } else {
      videoRef!.current!.pause();
    }
  }, [playerViewData.playPauseState]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-tech"></video>
    </div>
  );
};

export default VideoJSPlayer;

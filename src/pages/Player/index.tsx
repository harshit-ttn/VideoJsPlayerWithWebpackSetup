import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import VideoJSPlayer from "./videojsPlayer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import playIcon from "../../assets/images/play.svg";
import pauseIcon from "../../assets/images/pause.svg";
import { platformTvKeysMeth } from "../../constants/tvKey";

const Player: React.FC<any> = (props) => {
  const playPauseRef = useRef<HTMLDivElement>(null);
  const [videoJsOptions, setVideoJsOptions] = React.useState({});
  const [videoNode, setVideoNode] = React.useState<any>();
  const [playerViewData, setPlayerViewData] = useState<any>({
    playPauseState: "play",
  });
  const [isLoading, setIsLoading] = React.useState<any>(true);

  const playBackUrlResponse = useSelector<RootState, any>(
    (state: any) => state.videoPlayer.playBackUrlData
  );

  const playBackFormatResponse = useSelector<RootState, any>(
    (state: any) => state.videoPlayer.playBackFormatData
  );

  const contentNameResponse = useSelector<RootState, any>(
    (state: any) => state.videoPlayer.contentNameData
  );

  const drmDataResponse = useSelector<RootState, any>(
    (state: any) => state.videoPlayer.drmData
  );

  console.log(".....playBackUrlResponse....", playBackUrlResponse);

  useEffect(() => {
    if (playPauseRef?.current) {
      playPauseRef.current && playPauseRef.current!.focus();
    }
  }, [videoJsOptions, isLoading]);

  const onClickPlayPause = () => {
    playPauseHandling();
  };

  const playPauseHandling = () => {
    if (playerViewData.playPauseState === "play") {
      videoNode!.current!.pause();
    } else {
      videoNode!.current!.play();
    }
    setPlayerViewData((prevState: any) => ({
      ...playerViewData,
      playPauseState: prevState.playPauseState === "play" ? "pause" : "play",
    }));
  };

  const playHandling = () => {
    if (playerViewData.playPauseState === "pause") {
      videoNode!.current!.play();
      setPlayerViewData((prevState: any) => ({
        ...playerViewData,
        playPauseState: prevState.playPauseState === "play" ? "pause" : "play",
      }));
    }
  };
  const pauseHandling = () => {
    if (playerViewData.playPauseState === "play") {
      videoNode!.current!.pause();
      setPlayerViewData((prevState: any) => ({
        ...playerViewData,
        playPauseState: prevState.playPauseState === "play" ? "pause" : "play",
      }));
    }
  };

  const playerKeyHandler = (e: any) => {
    const keys = platformTvKeysMeth();

    switch (e.keyCode) {
      case keys.KEY_ENTER:
        playPauseHandling();
        break;

      case keys.KEY_PLAY:
        playHandling();
        break;

      case keys.KEY_PAUSE:
        pauseHandling();
        break;

      case keys.KEY_RETURN:
      case keys.KEY_BACK:
      case keys.KEY_STOP:
        history.back();
        break;
    }
  };

  useEffect(() => {
    if (
      typeof playBackUrlResponse === "string" &&
      playBackUrlResponse?.length > 0
    ) {
      let checkHLS = playBackUrlResponse?.includes(".m3u8");
      let checkDash = playBackFormatResponse?.includes(".mpd");
      let licenseUrl = `https://widevine-proxy.drm.technology/proxy`;

      if (checkHLS || playBackFormatResponse === "VOD_HLS") {
        if (drmDataResponse) {
          if (drmDataResponse?.license_url) {
            setVideoJsOptions({
              src: playBackUrlResponse,
              type: "application/x-mpegURL", // M3U8 format // HLS
              keySystems: {
                "com.widevine.alpha": {
                  url: drmDataResponse?.license_url,
                },
              },
            });
          } else {
            setVideoJsOptions({
              src: playBackUrlResponse,
              type: "application/x-mpegURL", // M3U8 format // HLS
              keySystems: {
                "com.widevine.alpha": {
                  url: licenseUrl,
                  licenseHeaders: {
                    "x-vudrm-token": drmDataResponse?.token,
                    kid: drmDataResponse?.kid,
                  },
                },
              },
            });
          }
        } else {
          setVideoJsOptions({
            src: playBackUrlResponse,
            type: "application/x-mpegURL", // M3U8 format // HLS
          });
        }
      } else if (checkDash || playBackFormatResponse === "VOD_DASH") {
        if (drmDataResponse) {
          if (drmDataResponse?.license_url) {
            setVideoJsOptions({
              src: playBackUrlResponse,
              type: "application/dash+xml", // MPD format // DASH
              keySystems: {
                "com.widevine.alpha": {
                  url: drmDataResponse?.license_url,
                },
              },
            });
          } else {
            setVideoJsOptions({
              src: playBackUrlResponse,
              type: "application/dash+xml", // MPD format // DASH
              keySystems: {
                "com.widevine.alpha": {
                  url: licenseUrl,
                  licenseHeaders: {
                    "x-vudrm-token": drmDataResponse?.token,
                    kid: drmDataResponse?.kid,
                  },
                },
              },
            });
          }
        } else {
          setVideoJsOptions({
            src: playBackUrlResponse,
            type: "application/dash+xml", // MPD format // DASH
          });
        }
      } else {
        setVideoJsOptions({
          src: playBackUrlResponse,
          type: "video/mp4", // MP4 format
        });
      }
    }
  }, [playBackUrlResponse]);

  return Object.keys(videoJsOptions)?.length ? (
    <div className="player-container">
      {!isLoading && (
        <div className="player-desc">
          <span className="player-title">{contentNameResponse}</span>
        </div>
      )}
      <div className="player-main">
        <VideoJSPlayer
          options={videoJsOptions}
          setVideoNode={setVideoNode}
          playerViewData={playerViewData}
          setPlayerViewData={setPlayerViewData}
          setIsLoading={setIsLoading}
        />
      </div>

      {!isLoading && (
        <div className="player-controls">
          <div
            className="play-pause-container"
            ref={playPauseRef}
            tabIndex={0}
            onClick={() => onClickPlayPause()}
            onKeyDown={(e: any) => playerKeyHandler(e)}
          >
            <img
              src={
                playerViewData.playPauseState === "play" ? playIcon : pauseIcon
              }
            />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loader-container">
          <img
            className="loader-image"
            src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
            alt="loader-image"
          />
        </div>
      )}
    </div>
  ) : (
    <div className="loader-container">
      <img
        className="loader-image"
        src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
        alt="loader-image"
      />
    </div>
  );
};

export default Player;

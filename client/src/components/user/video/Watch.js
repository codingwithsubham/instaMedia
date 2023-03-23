import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

const Watch = ({ url, contentId, loadPlayer, handleClose }) => {
  const [width] = useWindowSize();
  useEffect(() => {
  //render
  }, [width])
  
  const player = useRef(null);
  const [controlls, setControlls] = useState({
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    playbackRate: 1.0,
    loop: false,
  });

  const {
    playing,
    controls,
    light,
    volume,
    muted,
    played,
    playbackRate,
    loop,
  } = controlls;

  const handlePlayPause = () => {
    setControlls({ ...controlls, playing: !playing });
  };

  const handleSeekChange = (e) => {
    setControlls({ ...controlls, played: parseFloat(e.target.value) });
  };

  const handleSeekMouseDown = (e) => {
    setControlls({ ...controlls, seeking: true });
  };

  const handleSeekMouseUp = (e) => {
    setControlls({ ...controlls, seeking: false });
    player.current.seekTo(parseFloat(e.target.value));
  };

  const handleVolumeChange = e => {
    setControlls({ ...controlls, volume: parseFloat(e.target.value) })
  }

  return (
    loadPlayer && (
        width >= 600 ? (
            <div className="player-wraper insta-an">
            <div className="close" onClick={() => handleClose(false)}>
              x
            </div>
            <div className="vdo-wrpr">
              <div className="bar-top" />
              <div className="vdo-wrap" style={{backgroundImage: !playing ?`url('https://img.youtube.com/vi/${
                      url?.split("=")[1]
                    }/hqdefault.jpg')` : "none"}}/>
              <ReactPlayer
                ref={player}
                url={url}
                playing={playing}
                controls={controls}
                light={light}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
              />
              <div className="cntrls">
                <button onClick={() => handlePlayPause()}>
                  {playing ? (
                    <i className="fa fa-pause" />
                  ) : (
                    <i className="fa fa-play" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={0.999999}
                  step="any"
                  value={played}
                  onMouseDown={(e) => handleSeekMouseDown(e)}
                  onChange={(e) => handleSeekChange(e)}
                  onMouseUp={(e) => handleSeekMouseUp(e)}
                />
                <div className="vlum">
                <i className="fa fa-volume-up" />
                <input type='range' min={0} max={1} step='any' value={volume} onChange={ e => handleVolumeChange(e)} />
                </div>
              </div>
              <div className="bar-btm" />
            </div>
          </div>
        ) : (
            <div className="player-wraper-mob insta-an">
            <div className="close-mob" onClick={() => handleClose(false)}>
              x
            </div>
            <div className="vdo-wrpr-mob">
              <div className="bar-top-mob" />
              <div className="vdo-wrap-mob" style={{backgroundImage: !playing ?`url('https://img.youtube.com/vi/${
                      url?.split("=")[1]
                    }/hqdefault.jpg')` : "none"}}/>
              <ReactPlayer
                ref={player}
                url={url}
                playing={playing}
                controls={controls}
                light={light}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
              />
              <div className="cntrls-mob">
                <button onClick={() => handlePlayPause()}>
                  {playing ? (
                    <i className="fa fa-pause" />
                  ) : (
                    <i className="fa fa-play" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={0.999999}
                  step="any"
                  value={played}
                  onMouseDown={(e) => handleSeekMouseDown(e)}
                  onChange={(e) => handleSeekChange(e)}
                  onMouseUp={(e) => handleSeekMouseUp(e)}
                />
                <div className="vlum-mob">
                <i className="fa fa-volume-up" />
                <input type='range' min={0} max={1} step='any' value={volume} onChange={ e => handleVolumeChange(e)} />
                </div>
              </div>
              <div className="bar-btm-mob" />
            </div>
          </div>
        )
    )
  );
};

export default Watch;

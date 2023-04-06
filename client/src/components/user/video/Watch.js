import React, { useState, useRef, useEffect, Fragment } from "react";
import ReactPlayer from "react-player/youtube";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../../actions/auth";
import { isGreaterDate } from "../../../functions/dateCompare";

const Watch = ({ match, auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const videoId = match.params.id;
  const history = useHistory();
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
    player.current.seekTo(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setControlls({ ...controlls, volume: parseFloat(e.target.value) });
  };

  if (!user?.subsEndDate || !isGreaterDate(user?.subsEndDate)) {
    return (
      <Fragment>
        <div className="no-watch">
          You are not Sbuscribed !! Please Subscribe To Enjoy Unlimited Watching
          Experience.
          <Link to="/profile" className="btn">
            Subscribe Now
          </Link>
        </div>
      </Fragment>
    );
  }

  return (
    <div className="player-wraper insta-an">
      <div className="close" onClick={history.goBack}>
        x
      </div>
      <div className="vdo-wrpr">
        <div className="bar-top" />
        <div
          className="vdo-wrap"
          style={{
            backgroundImage: !playing
              ? `url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg')`
              : "none",
            zIndex: !playing ? "999" : "-1",
          }}
        />
        <ReactPlayer
          ref={player}
          url={`https://www.youtube.com/watch?v=${videoId}`}
          playing={playing}
          controls={controls}
          light={light}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onPlay={() => setControlls({ ...controlls, playing: true })}
          onPause={() => setControlls({ ...controlls, playing: false })}
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
            onChange={(e) => handleSeekChange(e)}
          />
          <div className="vlum">
            <i className="fa fa-volume-up" />
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={(e) => handleVolumeChange(e)}
            />
          </div>
        </div>
        <div className="bar-btm" />
      </div>
    </div>
  );
};

Watch.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
})(Watch);

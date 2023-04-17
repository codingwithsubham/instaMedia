import React, { useState, useRef, useEffect, 
//  Fragment 
} from "react";
import ReactPlayer from "react-player/youtube";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../../actions/auth";
//import { isGreaterDate } from "../../../functions/dateCompare";

const ShortsWatch = ({
  shortId,
  //auth: { user },
  loadUser,
}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const videoId = shortId;
  const player = useRef(null);
  const [controlls, setControlls] = useState({
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    playbackRate: 1.0,
    loop: false,
  });

  const { playing, controls, light, volume, muted, playbackRate, loop } =
    controlls;

  // if (!user?.subsEndDate || !isGreaterDate(user?.subsEndDate)) {
  //   return (
  //     <Fragment>
  //       <div className="no-watch">
  //         You are not Sbuscribed !! Please Subscribe To Enjoy Unlimited Watching
  //         Experience.
  //         <Link to="/profile" className="btn">
  //           Subscribe Now
  //         </Link>
  //       </div>
  //     </Fragment>
  //   );
  // }

  return (
    <div className="shorts insta-an">
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
      />
    </div>
  );
};

ShortsWatch.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
})(ShortsWatch);

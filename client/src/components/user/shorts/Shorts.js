import React, { useEffect } from "react";
import { getShorts } from "../../../actions/content";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ShortsWatch from "./ShortsWatch";

const Shorts = ({ getShorts, content: { shorts } }) => {
  useEffect(() => {
    getShorts();
  }, [getShorts]);
  return (
    <div className="shorts">
      {
        shorts?.map(item => (
            <ShortsWatch shortId={item.videoUrl?.split("=")[1]} />
        ))
      }
      </div>
  );
};

Shorts.propTypes = {
  content: PropTypes.object.isRequired,
  getShorts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps, {
  getShorts,
})(Shorts);

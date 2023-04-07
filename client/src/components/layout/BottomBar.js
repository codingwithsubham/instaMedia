import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { Link } from "react-router-dom";

const BottomBar = ({auth: { isAuthenticated, user }, loadUser}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return isAuthenticated && user && (
    <div className="btm-bar">
      <div className="btm-bar-wrap">
          <Link to="/home">
            <i className="fa fa-home"></i>
            <div className="btm-txt">Home</div>
          </Link>
          <Link to="/search">
            <i className="fa fa-search"></i>
            <div className="btm-txt">Search</div>
          </Link>
          <Link to="/category">
            <i className="fa fa-list"></i>
            <div className="btm-txt">Category</div>
          </Link>
          <Link to="/shorts">
            <i className="fa fa-video-camera"></i>
            <div className="btm-txt">Clips</div>
          </Link>
          <Link to="/profile">
            <i className="fa fa-user"></i>
            <div className="btm-txt">Profile</div>
          </Link>
        </div>
    </div>
  );
};

BottomBar.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
})(BottomBar);

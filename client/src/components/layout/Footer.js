import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";

const Footer = ({ auth: { isAuthenticated, user } }) => {
  let dt = new Date();
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return isAuthenticated && user && (
    <div className="footer">
      <div className="ftr-txt">
        Created with <i className="fa fa-heart"></i> by Infomatric.
      </div>
      <div className="ftr-cpyryt">
        Copyright© {dt.getFullYear()} Happy Family Marketing
      </div>
    </div>
  );
};

Footer.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
})(Footer);

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import SubsPage from "../subscription/SubsPage";

const Profile = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <div className="profile-page">
      <div className="profile-dtls">
        <h3>Hello {user?.name}</h3>
        <p>
          <strong>Mobile: </strong>
          {user?.mobile}
        </p>
        <SubsPage user={user} />
      </div>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
})(Profile);

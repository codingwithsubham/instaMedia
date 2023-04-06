import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { openSidebar } from "../../actions/layout";
import CreateContent from "../admin/content/CreateContent";
import GetContents from "../admin/content/GetContents";
import Landing from "../user/content/Landing";

const Home = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <Fragment>
      <div className="hme">
        {user.role === "admin" ? (
          <Fragment>
            <div className="hme-content-item">
              <CreateContent />
            </div>
            <div className="hme-content-item">
              <GetContents />
            </div>
          </Fragment>
        ):(
          <Landing />
        )}
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  openSidebar,
  loadUser,
})(Home);

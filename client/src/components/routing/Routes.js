import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";
import Alert from "../layout/Alert";
import ScrollToTop from "../../ScrollToTop";
import PrivateRoute from "./PrivateRoute";
import Home from "../home/Home";
import ContentPage from "../user/video/ContentPage";
import Watch from "../user/video/Watch";

const Routes = ({ layout: { isSidebarOpen }, auth: { isAuthenticated } }) => {
  return (
    <div
      id="main"
      style={
        isSidebarOpen
          ? { marginLeft: "20%", marginTop: isAuthenticated ? "100px" : "" }
          : { marginLeft: "0%", marginTop: isAuthenticated ? "100px" : "" }
      }
    >
      <Alert />
      <ScrollToTop />
      <Switch>
        <PrivateRoute exact path="/home" component={Home} />
        <Route exact path="/watch/:id" component={Watch} />
        <Route exact path="/content/:id" component={ContentPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  layout: state.layout,
});

export default connect(mapStateToProps, {})(Routes);

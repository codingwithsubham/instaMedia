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
import Footer from "../layout/Footer";
import Profile from "../profile/Profile";
import ClosePage from "../paymentGateway/ClosePage";
import CategoryPage from "../user/category/CategoryPage";
import CategoryContent from "../user/category/CategoryContent";
import Shorts from "../user/shorts/Shorts";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
import AboutUs from "../pages/AboutUs";

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
        <PrivateRoute exact path="/watch/:id" component={Watch} />
        <PrivateRoute exact path="/content/:id" component={ContentPage} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/category" component={CategoryPage} />
        <PrivateRoute exact path="/shorts" component={Shorts} />
        <PrivateRoute exact path="/videos/:cat/:sub" component={CategoryContent} />
        <PrivateRoute exact path="/videos/:cat" component={CategoryContent} />
        <Route exact path="/close-page" component={ClosePage} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/terms-conditions" component={TermsConditions} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
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

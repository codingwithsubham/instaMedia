import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Sidebar from "./components/layout/Sidebar";
import BottomBar from "./components/layout/BottomBar";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Fragment>
            <Navbar />
            <Sidebar />
            <BottomBar />
            <section className="container">
              <div className="main-content">
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route exact path="/" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route component={Routes} />
                </Switch>
              </div>
            </section>
          </Fragment>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

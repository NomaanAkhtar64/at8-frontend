import React from "react";
import { Route } from "react-router";
import { connect } from "react-redux";

import Layout from "./layout/Layout";
import Home from "./screens/Home";
import Account from "./screens/Account";
import Games from "./screens/Games";
import Announcements from "./screens/Announcements";
import * as actions from "./store/actions/auth";

function App(props) {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Account} />
            {props.isAuthenticated ? (
                <Route exact path="/games" component={Games} />
            ) : (
                ""
            )}

            <Route exact path="/announcements" component={Announcements} />
        </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.token !== null,
    };
};

const mapDispatchToProps = (dispatchEvent) => {
    return {
        onTryAutoSignup: () => dispatchEvent(actions.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

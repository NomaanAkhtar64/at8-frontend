import React, { useEffect } from "react";
import { Route } from "react-router";
import { connect } from "react-redux";

import Layout from "./layout/Layout";
import Home from "./screens/Home";
import Account from "./screens/Account";
import Games from "./screens/Games";
import Announcements from "./screens/Announcements";
import * as actions from "./store/actions/auth";
import Profile from "./screens/Profile";
import Error from "./screens/Error";

interface AppProps {
    onTryAutoSignup: () => void;
    isAuthenticated: boolean;
}

const App: React.FC<AppProps> = ({ onTryAutoSignup, isAuthenticated }) => {
    console.log(isAuthenticated);

    useEffect(() => {
        onTryAutoSignup();
    }, []);
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            {!isAuthenticated && (
                <Route exact path="/signup" component={Account} />
            )}
            <Route exact path="/games" component={Games} />
            <Route exact path="/announcements" component={Announcements} />
            <Route
                exact
                path="/profile"
                component={isAuthenticated ? Profile : Error}
            />
        </Layout>
    );
};

const mapStateToProps = (state: UserState) => {
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

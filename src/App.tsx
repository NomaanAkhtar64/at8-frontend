import React, { lazy, Suspense, useEffect } from "react";
import { Route } from "react-router";
import { connect } from "react-redux";

import Layout from "./layout/Layout";
import * as actions from "./store/actions/auth";
import LoadingBar from "./components/LoadingBar";

const Home = lazy(() => import("./screens/Home"));
const Account = lazy(() => import("./screens/Account"));
const Announcements = lazy(() => import("./screens/Announcements"));
const Games = lazy(() => import("./screens/Games"));
const Profile = lazy(() => import("./screens/Profile"));
const Error = lazy(() => import("./screens/Error"));
const Tournament = lazy(() => import("./screens/Tournament"));

interface AppProps {
    onTryAutoSignup: () => void;
    isAuthenticated: boolean;
}

const App: React.FC<AppProps> = ({ onTryAutoSignup, isAuthenticated }) => {
    console.log(isAuthenticated);

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);
    return (
        <Layout>
            <Suspense fallback={<LoadingBar />}>
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
                <Route exact path="/tournament/:slug" component={Tournament} />
            </Suspense>
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

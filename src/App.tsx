import React from "react";
import { Route } from "react-router";
import Layout from "./layout/Layout";

import Home from "./screens/Home";
import Account from "./screens/Account";
import Games from "./screens/Games"
import Announcements from "./screens/Announcements";

function App() {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Account} />
            <Route exact path="/games" component={Games} />
            <Route exact path="/announcements" component={Announcements} />
        </Layout>
    );
}

export default App;

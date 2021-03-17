import React from "react";
import { Route } from "react-router";
import Layout from "./layout/Layout";

import Home from "./screens/Home";
import Account from "./screens/Account";

function App() {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Account} />
        </Layout>
    );
}

export default App;

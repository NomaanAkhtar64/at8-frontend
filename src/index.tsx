import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";

import App from "./App";
import reducer from "./store/reducers/auth";

const composeEnhancers = window[
    "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"
] as typeof compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

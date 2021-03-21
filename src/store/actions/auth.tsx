import Axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Email");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authLogin = (email, password) => {
    return (dispatchEvent) => {
        dispatchEvent(authStart());
        Axios.post("https://at8-backend.herokuapp.com/rest-auth/login/", {
            email: email,
            password: password,
        })
            .then((res) => {
                const token = res.data.key;
                const userEmail = email;
                localStorage.setItem("token", token);
                localStorage.setItem("Email", userEmail);
                dispatchEvent(authSuccess(token));
            })
            .catch((err) => dispatchEvent(authFail(err)));
    };
};

export const authSignup = (username, email, password1, password2) => {
    return (dispatchEvent) => {
        dispatchEvent(authStart());
        Axios.post(
            "https://at8-backend.herokuapp.com/rest-auth/registration/",
            {
                username: username,
                email: email,
                password1: password1,
                password2: password2,
            }
        )
            .then((res) => {
                const token = res.data.key;
                localStorage.setItem("token", token);
                dispatchEvent(authSuccess(token));
            })
            .catch((err) => {
                dispatchEvent(authFail(err));
            });
    };
};

export const authCheckState = () => {
    return (dispatchEvent) => {
        const token = localStorage.getItem("token");
        if (token === undefined) {
            dispatchEvent(logout());
        } else {
            dispatchEvent(authSuccess(token));
        }
    };
};

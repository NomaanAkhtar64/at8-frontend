import React, { useState, Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";
import { connect } from "react-redux";

import * as actions from "../store/actions/auth";

interface SignupProps extends UserState {
    onAuth: (
        username: string,
        email: string,
        password1: string,
        password2: string
    ) => void;
    toLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onAuth, toLogin }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRe, setPasswordRe] = useState("");
    const [error, setError] = useState<null | string | Error | AxiosError>(
        null
    );

    return (
        <form
            className="form"
            onSubmit={(e) => {
                e.preventDefault();
                if (username === "") {
                    setError("Username is Required!");
                }
                if (email === "") {
                    setError("Email is Required!");
                }
                if (password === "") {
                    setError("Password is Required!");
                }
                if (passwordRe === "") {
                    setError("Password Confirmation is Required!");
                }
                let emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!emailre.test(email)) {
                    setError("Email is Invalid!");
                }
                if (password.length < 8) {
                    setError("Password can't be less then 8!");
                }
                if (password !== passwordRe) {
                    setError("Password doesn't matches!");
                }
                onAuth(username, email, password, passwordRe);
                toLogin();
            }}
        >
            <legend className="mb-4">Signup</legend>
            <div className="mb-3">
                <input
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <small>
                    <ul>
                        <li>Password must contain alteast 8 characters.</li>
                    </ul>
                </small>
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    name="confirm"
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordRe}
                    onChange={(e) => setPasswordRe(e.target.value)}
                    required
                />
            </div>
            <div>
                <button type="submit" className="btn btn-secondary signup-btn">
                    SIGNUP
                </button>
            </div>
        </form>
    );
};

function mapStateToProps(state: UserState): Partial<UserState> {
    return {
        loading: state.loading,
        error: state.error,
    };
}

const mapsDispatchToProps = (dispatchEvent) => {
    return {
        onAuth: (
            username: string,
            email: string,
            password1: string,
            password2: string
        ) =>
            dispatchEvent(
                actions.authSignup(username, email, password1, password2)
            ),
    };
};

export default connect(mapStateToProps, mapsDispatchToProps)(Signup);

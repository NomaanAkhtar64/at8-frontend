import React from "react";
import { connect } from "react-redux";

import * as actions from "../store/actions/auth";

interface SignupProps {
    props: any;
}

const Signup: React.FC<SignupProps> = ({ props }) => {
    return (
        <form
            className="form"
            onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                props.onAuth(
                    target.username.value,
                    target.email.value,
                    target.password.value,
                    target.confirm.value
                );
            }}
        >
            <legend>Signup Form</legend>
            <div id="username" className="mb-3">
                <input
                    id="username"
                    className="form-control"
                    name="username"
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
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
                <small>
                    <ul>
                        <li>Password must contain alteast 8 characters.</li>
                        <li>Password must not not be entirely numeric.</li>
                        <li>
                            Password must contain atleast 1 alphabet and 1
                            number.
                        </li>
                    </ul>
                </small>
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    name="confirm"
                    type="password"
                    placeholder="Confirm Password"
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

const WrappedSignupForm = Signup;

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        Auth: state,
    };
};

const mapsDispatchToProps = (dispatchEvent) => {
    return {
        onAuth: (username, email, password1, password2) =>
            dispatchEvent(
                actions.authSignup(username, email, password1, password2)
            ),
    };
};

export default connect(mapStateToProps, mapsDispatchToProps)(WrappedSignupForm);

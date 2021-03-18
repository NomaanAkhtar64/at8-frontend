import React from "react";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    return (
        <form className="form">
            <legend>Login Form</legend>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                />
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                />
            </div>
            <div>
                <button type="submit" className="btn btn-secondary signup-btn">
                    LOGIN
                </button>
            </div>
            <div>
                <p className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </p>
            </div>
        </form>
    );
};

export default Login;

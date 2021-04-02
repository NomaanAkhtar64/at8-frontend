import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../store/actions/auth";
import checkLoginData from "../errors/check/checkLoginData";
import Error from "../components/Error";
import { AxiosError } from "axios";
interface LoginProps extends UserState {
    onAuth: (email: string, password: string) => void;
    serverError: AxiosError<{ non_field_errors: string[] }> | null;
    isReqLoading: boolean;
    clearServerError: () => void;
}

const Login: React.FC<LoginProps> = ({
    onAuth,
    serverError,
    isReqLoading,
    clearServerError,
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const { search } = history.location;
    const [isDisabled, setDisable] = useState(false);

    useEffect(() => {
        if (!isReqLoading && isDisabled && !serverError) {
            history.push("/");
            setDisable(false);
        }
        if (serverError) {
            setDisable(false);
        }
    }, [isReqLoading, isDisabled, serverError, history]);
    return (
        <form
            className="form"
            onSubmit={(e) => {
                e.preventDefault();
                setDisable(true);
                clearServerError();
                let { hasError, message } = checkLoginData(email, password);
                if (hasError) {
                    setError(message);
                    setDisable(false);
                } else {
                    console.log(onAuth(email, password));
                }
            }}
        >
            {search.includes("redirect=true") && (
                <Error>You Need To Login First</Error>
            )}
            {serverError && (
                <Error>
                    {serverError.response.data.non_field_errors[0].includes(
                        "Unable to log in"
                    ) && "The Given Username Or Password Is Incorrect"}
                </Error>
            )}
            <legend className="mb-4">Login</legend>
            <div className="mb-3">
                <input
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    disabled={isDisabled}
                />
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    disabled={isDisabled}
                />
            </div>
            {error !== "" && <div>{error}</div>}
            <div>
                <button type="submit" className="btn btn-secondary signup-btn">
                    LOGIN
                </button>
            </div>
            <div>
                <p className="forgot-password">
                    <Link to="/reset-password">Forgot Password?</Link>
                </p>
            </div>
        </form>
    );
};

const mapStateToProps = (state: UserState) => {
    return {
        isReqLoading: state.loading,
        serverError: state.error,
    };
};

const mapsDispatchToProps = (dispatchEvent) => {
    return {
        onAuth: (email: string, password: string) =>
            dispatchEvent(actions.authLogin(email, password)),
        clearServerError: () => dispatchEvent(actions.authClearError()),
    };
};

export default connect(mapStateToProps, mapsDispatchToProps)(Login);

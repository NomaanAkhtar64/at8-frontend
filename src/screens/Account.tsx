import React, { useState } from "react";
import Login from "../forms/Login";
import Signup from "../forms/Signup";
import "./Account.scss";

interface AccountProps {}

const Account: React.FC<AccountProps> = ({}) => {
    const [isSignupActive, setActive] = useState(true);

    return (
        <>
            <div className="account-page">
                <div className="page mt-5 pb-3">
                    <div className="tab">
                        <button
                            className="btn tab-btn"
                            style={{
                                background: isSignupActive
                                    ? "#23233d"
                                    : "black",
                            }}
                            onClick={() => {
                                setActive(false);
                            }}
                        >
                            LOGIN
                        </button>
                        <button
                            className="btn tab-btn"
                            style={{
                                background: isSignupActive
                                    ? "black"
                                    : "#23233d",
                            }}
                            onClick={() => {
                                setActive(true);
                            }}
                        >
                            SIGNUP
                        </button>
                    </div>
                    {isSignupActive ? <Signup /> : <Login />}
                </div>
            </div>
        </>
    );
};

export default Account;

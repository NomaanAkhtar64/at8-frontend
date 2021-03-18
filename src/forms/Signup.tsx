import React from "react";

interface SignupProps {}

const Signup: React.FC<SignupProps> = ({}) => {
    return (
        <form className="form">
            <legend>Signup Form</legend>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                />
            </div>
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
                <small>
                    <ul>
                        <li>Password must contain alteast 8 characters.</li>
                        <li>Password must not not be entirely numeric.</li>
                        <li>Password must contain atleast 1 alphabet and 1 number.</li>
                    </ul>
                </small>
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm Password"
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

export default Signup;

import axios from "axios";
import React, { useState } from "react";
import Loading from "../components/Loading";
import { __API_URL__ } from "../const";
import "./ResetPassword.scss";

interface ResetPasswordProps {}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
    const [email, setEmail] = useState("");
    const [request, setRequest] = useState(false);
    const [sent, setSent] = useState(false);

    return (
        <>
            <div className="reset-password-page mt-5">
                <div className="container">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            axios
                                .post(
                                    `${__API_URL__}/api/reset-password/`,
                                    {
                                        email: email,
                                    }
                                )
                                .then((res) => {
                                    setSent(true);
                                    console.log(res.data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            setRequest(true);
                        }}
                    >
                        <legend style={{ textAlign: "center" }}>
                            Reset Password
                        </legend>
                        <fieldset>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your registered Email"
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Submit
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <br />
            {request ? (
                <div>
                    {sent ? (
                        <h2 className="contianer text-white text-center">
                            Reset Password link is sent to the email!
                        </h2>
                    ) : (
                        <Loading />
                    )}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default ResetPassword;

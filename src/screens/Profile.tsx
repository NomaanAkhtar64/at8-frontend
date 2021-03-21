import React, { useState } from "react";
import useProfile from "../hooks/useProfile";

import "./Profile.scss";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [tournaSelect, setTournaSelect] = useState(true);
    const [settingSelect, setSettingSelect] = useState(false);

    const profile = useProfile();
    console.log(profile);
    return (
        <>
            <div className="profile-page">
                <div className="tab mt-5">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <span
                                className={`nav-link ${
                                    tournaSelect ? "active" : "text-white"
                                }`}
                                aria-current="page"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setTournaSelect(true);
                                    setSettingSelect(false);
                                }}
                            >
                                Tournament History
                            </span>
                        </li>
                        <li className="nav-item">
                            <span
                                className={`nav-link ${
                                    settingSelect ? "active" : "text-white"
                                }`}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setSettingSelect(true);
                                    setTournaSelect(false);
                                }}
                            >
                                Settings
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="profile-data mt-5">
                    <div className="profile-pic">
                        <form>
                            <legend>Profile Picture</legend>
                            <div className="mb-3">
                                <input type="file" />
                            </div>
                            <div className="btns">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="profile">
                        <form>
                            <legend style={{ textAlign: "center" }}>
                                Profile
                            </legend>
                            <div className="mb-3">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={first}
                                    onChange={(e) => setFirst(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={last}
                                    onChange={(e) => setLast(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Discord name with tag</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="name#tag"
                                />
                            </div>
                            <div className="btns">
                                <button
                                    type="submit"
                                    className="btn btn-success profile-btn"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger profile-btn"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="password-form mb-5">
                        <form>
                            <legend>Change Password</legend>
                            <div className="mb-3">
                                <label>Old Password</label>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Re-enter Password"
                                    className="form-control"
                                />
                            </div>
                            <div className="btns">
                                <button
                                    type="submit"
                                    className="btn btn-success profile-btn"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger profile-btn"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

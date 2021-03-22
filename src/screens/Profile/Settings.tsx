import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import useProfile from "../../hooks/useProfile";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    const [username, setUsername] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [error, setError] = useState("");

    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    const token = `Token ` + localStorage.getItem("token");
    const headers = {
        Authorization: token,
    };
    const profile = useProfile();
    useEffect(() => {
        setUsername(profile.state.username);
        setFirst(profile.state.first_name);
        setLast(profile.state.last_name);
    }, []);

    if (profile.hasLoaded) {
        return (
            <div className="profile-data">
                <div className="profile-pic">
                    <form>
                        <legend>Profile Picture</legend>

                        <div className="form-group">
                            <div className="input-group mb-3">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="custom-file-input"
                                        id="inputGroupFile02"
                                    />
                                    <label className="custom-file-label">
                                        Choose file
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="btns">
                            <button type="submit" className="btn btn-success">
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
                <div className="profile">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            axios
                                .put(
                                    "https://at8-backend.herokuapp.com/rest-auth/user/",
                                    {
                                        username: username,
                                        first_name: first,
                                        last_name: last,
                                    },
                                    {
                                        headers: headers,
                                    }
                                )
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }}
                    >
                        <legend style={{ textAlign: "center" }}>Profile</legend>
                        <div className="mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="form-control"
                                value={profile.state.email}
                                disabled
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
                                value={profile.profile[0].discord_name_tag}
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
                <div className="password-form ">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();

                            if (pass1.length < 8) {
                                setError(
                                    "Password must be atleast 8 characters long!"
                                );
                            }
                            if (pass1 !== pass2) {
                                console.log(true);
                                setError("Password does not match!");
                            }

                            if (error !== "") {
                                <p>{error}</p>;
                            } else {
                                axios
                                    .post(
                                        "https://at8-backend.herokuapp.com/rest-auth/password/change/",
                                        {
                                            new_password1: pass1,
                                            new_password2: pass2,
                                        },
                                        {
                                            headers: headers,
                                        }
                                    )
                                    .then((res) => {
                                        console.log(res.data);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }
                        }}
                    >
                        <legend>Change Password</legend>
                        <div className="mb-3">
                            <label>New Password</label>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="form-control"
                                value={pass1}
                                onChange={(e) => {
                                    if (e.target.value.length < 8) {
                                        setPass1(e.target.value);
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Re-enter Password"
                                className="form-control"
                                value={pass2}
                                onChange={(e) => {
                                    setPass2(e.target.value);
                                }}
                            />
                        </div>
                        <p style={{ color: "red" }}>{error}</p>
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
                                onClick={() => {
                                    setPass1("");
                                    setPass2("");
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    return <Loading />;
};

export default Settings;

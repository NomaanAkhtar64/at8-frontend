import React, { useState } from "react";
import useTeams from "../../hooks/useTeams";

import SteamDefault from "../../assets/SteamDefault.png";
import useProfile from "../../hooks/useProfile";
import Loading from "../../components/Loading";

interface MyTeamProps {}

const MyTeam: React.FC<MyTeamProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pic, setPic] = useState({});
    const [picUrl, setPicUrl] = useState(null);

    const teams = useTeams();
    const profile = useProfile();

    console.log(teams);
    if (profile.hasLoaded) {
        return (
            <div className="team">
                {teams.state.map((team, i) => (
                    <div key={i} className="team-data">
                        {/* <h4>Team:{team.name}</h4> */}
                        <div className="player captain">
                            <h3>Captain</h3>
                            <img
                                src={SteamDefault}
                                className="captain-image"
                                alt="Default"
                            />
                        </div>
                        {team.players.map((player, i) => (
                            <div className="player">
                                <h3>Player</h3>
                                <img src={SteamDefault} alt="Default" />
                            </div>
                        ))}
                        <div className="player">
                            <h3>You</h3>
                            <img
                                src={
                                    profile.profile.pic
                                        ? profile.profile.pic
                                        : SteamDefault
                                }
                                className="me"
                                alt="Default"
                            />
                        </div>
                    </div>
                ))}

                <div className="team-register">
                    {isOpen ? (
                        <div className="register-form">
                            <form>
                                <legend>Register your Team now</legend>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Team Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Team Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Team Logo</label>
                                    <div className="input-group mb-3">
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="custom-file-input"
                                                id="inputGroupFile02"
                                                onChange={(e) => {
                                                    setPic(e.target.files[0]);
                                                    setPicUrl({
                                                        picUrl: URL.createObjectURL(
                                                            e.target.files[0]
                                                        ),
                                                    });
                                                }}
                                            />
                                            <label className="custom-file-label">
                                                {pic["name"] ? (
                                                    <p>{pic["name"]}</p>
                                                ) : (
                                                    "Choose file"
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Captain</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Team Captain's Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dicord username & tag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g: username#tag"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    style={{ width: "50%" }}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="btn btn-danger"
                                    style={{ width: "50%" }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-lg btn-outline-success register-btn"
                            onClick={() => setIsOpen(true)}
                        >
                            Register
                        </button>
                    )}
                </div>
            </div>
        );
    }
    return <Loading />;
};

export default MyTeam;

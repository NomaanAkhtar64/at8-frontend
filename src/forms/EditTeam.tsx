import React, { useLayoutEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Loading from "../components/Loading";
import useProfile from "../hooks/useProfile";
import useTeams from "../hooks/useTeams";

interface EditTeamProps extends RouteComponentProps<{ id }> {
    id: number;
}

const EditTeam: React.FC<EditTeamProps> = ({ id, match }) => {
    const [name, setName] = useState("");
    const [logo, setLogo] = useState<File>(null);
    const [captain, setCaptain] = useState("");
    const [captainTag, setCaptainTag] = useState("");
    const [captainProfile, setCaptainProfile] = useState("");
    const [players, setPlayers] = useState([
        {
            idx: 1,
            username: "",
            url: "",
        },
        {
            idx: 2,
            username: "",
            url: "",
        },
        {
            idx: 3,
            username: "",
            url: "",
        },
        {
            idx: 4,
            username: "",
            url: "",
        },
        {
            idx: 5,
            username: "",
            url: "",
        },
    ]);
    const profile = useProfile();
    const teamId = match.params.id;
    const team = useTeams(profile.state.pk, teamId);
    console.log(team);
    
    return (
        <div className="edit-team">
            {team.hasLoaded ? (
                <form>
                    <legend>Edit Team</legend>
                    <div className="form-group">
                        <label>Team Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name your team"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Upload team logo</label>
                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="custom-file-input"
                                    id="inputGroupFile02"
                                    required
                                    onChange={(e) => {
                                        console.log(e.target.files[0]);
                                        setLogo(e.target.files[0]);
                                    }}
                                />
                                <label className="custom-file-label">
                                    {logo ? <p>{logo.name}</p> : "Choose file"}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Team Captain</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={captain}
                            onChange={(e) => setCaptain(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Discord username + Tag</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="name#1234"
                            value={captainTag}
                            onChange={(e) => setCaptainTag(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Steam Profile link</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Place URL"
                            value={captainProfile}
                            onChange={(e) => setCaptainProfile(e.target.value)}
                            required
                        />
                    </div>
                </form>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default EditTeam;

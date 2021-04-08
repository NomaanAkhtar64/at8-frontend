import React, { useState } from "react";
import Loading from "../components/Loading";
import deleteTeam from "../hooks/deleteTeam";
import editTeamRegister from "../hooks/editTeamRegister";
import useTeam from "../hooks/useTeam";
import imgToBase64 from "../utils/imgToBase64";
import PlayerFields from "./PlayerFields";

interface EditTeamProps {
    userId: number;
    teamId: number;
    toBack: () => void;
}
interface FormProps {
    team: Teams;
    getBack: () => void;
}
const Form: React.FC<FormProps> = (props) => {
    const t = props.team;
    console.log(t);
    const [name, setName] = useState<string>(t.name);
    const [logo, setLogo] = useState<File>(null);
    const [logoURL, setLogoURL] = useState(null);
    const [captain, setCaptain] = useState<string>(t.captain.username);
    const [captainTag, setCaptainTag] = useState<string>(
        t.team_captains_discord_tag
    );
    const [captainProfile, setCaptainProfile] = useState<string>(t.captain.url);
    const [players, setPlayers] = useState<Player[]>(t.players);
    const [isDisabled, setDisabled] = useState(false);
    console.log(t.players);
    return (
        <form
            className="edit-form"
            onSubmit={async (e) => {
                e.preventDefault();
                setDisabled(true);
                const validPlayers = players.filter((p, i) =>
                    i === 4 ? p.url.length > 0 && p.username.length > 0 : true
                );
                let imgBase64: string;
                if (logo) {
                    imgBase64 = await imgToBase64(logo);
                } else {
                    imgBase64 = undefined;
                }
                await editTeamRegister({
                    id: t.id,
                    name: name,
                    logo: imgBase64,
                    captain: {
                        username: captain,
                        url: captainProfile,
                    },
                    team_captains_discord_tag: captainTag,
                    players: validPlayers,
                });
                setDisabled(false);
            }}
        >
            <div className="profile-data" style={{ flexDirection: "column" }}>
                <div className="back-btn edit px-3">
                    <button
                        type="button"
                        className="btn btn-warning"
                        style={{
                            borderTopLeftRadius: "50px",
                            borderBottomLeftRadius: "50px",
                        }}
                        onClick={() => props.getBack()}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        className="btn btn-delete"
                        style={{ marginLeft: "auto" }}
                        onClick={() => {
                            deleteTeam(t.id);
                            props.getBack();
                        }}
                    >
                        DELETE
                    </button>
                </div>
                <div className="main-team-section">
                    <div className="edit-team-section">
                        <legend>EDIT TEAM</legend>
                        <div className="form-group">
                            <label>Team Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name your team"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isDisabled}
                            />
                        </div>
                        <div className="profile-pic-container">
                            <img
                                src={logoURL ? logoURL.logoURL : t.logo}
                                alt=""
                                width="100%"
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
                                        disabled={isDisabled}
                                        onChange={(e) => {
                                            if (e.target.files.length > 0) {
                                                setLogo(e.target.files[0]);
                                                setLogoURL({
                                                    logoURL: URL.createObjectURL(
                                                        e.target.files[0]
                                                    ),
                                                });
                                            } else {
                                                setLogo(null);
                                                setLogoURL({
                                                    logoURL: null,
                                                });
                                            }
                                        }}
                                    />
                                    <label className="custom-file-label">
                                        {logo ? (
                                            <p>{logo.name}</p>
                                        ) : (
                                            "Choose file"
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="edit-team-section">
                        <legend>Team Captain</legend>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={captain}
                                disabled={isDisabled}
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
                                disabled={isDisabled}
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
                                onChange={(e) =>
                                    setCaptainProfile(e.target.value)
                                }
                                disabled={isDisabled}
                                required
                            />
                        </div>
                    </div>
                    <div className="edit-team-section">
                        <legend>Players</legend>
                        {players.map((pl, i) => (
                            <PlayerFields
                                key={i}
                                number={i + 1}
                                isAlternate={i === 4}
                                player={pl}
                                disabled={isDisabled}
                                updatePlayer={(p) => {
                                    setPlayers([
                                        ...players.filter(
                                            (pl, indx) => indx !== i
                                        ),
                                        p,
                                    ]);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="edit-team-btns">
                <button
                    disabled={isDisabled}
                    type="submit"
                    className="btn btn-success"
                >
                    Save
                </button>
                <button
                    disabled={isDisabled}
                    type="button"
                    className="btn btn-danger"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

const EditTeam: React.FC<EditTeamProps> = ({ userId, teamId, toBack }) => {
    const teams = useTeam(userId, teamId);
    if (teams.hasLoaded) {
        return <Form getBack={() => toBack()} team={teams.state} />;
    }
    return <Loading />;
};

export default EditTeam;

import React, { useState } from "react";
import useSite from "../hooks/useSite";
import PlayerFields from "./PlayerFields";
import parser from "html-react-parser";
import * as regex from "../regex";
import imgToBase64 from "../utils/imgToBase64";
import registerTeam from "../hooks/registerTeam";
import useProfile from "../hooks/useProfile";
import "../screens/EnterTournament.scss";

interface CreateTeamProps {}

type Active = "basic" | "captain" | "player";
const CreateTeam: React.FC<CreateTeamProps> = ({}) => {
    const [active, setActive] = useState<Active>("basic");
    const [name, setName] = useState("");
    const [logo, setLogo] = useState<File>(null);
    const [captain, setCaptain] = useState("");
    const [captainTag, setCaptainTag] = useState("");
    const [captainProfile, setCaptainProfile] = useState("");
    const site = useSite();
    console.log(site);
    const [players, setPlayers] = useState<Player[]>([
        {
            username: "",
            url: "",
        },
        {
            username: "",
            url: "",
        },
        {
            username: "",
            url: "",
        },
        {
            username: "",
            url: "",
        },
        {
            username: "",
            url: "",
        },
    ]);
    const [isDisabled, setDisabled] = useState(false);
    const profile = useProfile();
    return (
        <div className="create-team-form" style={{ width: "100%" }}>
            <div className="register">
                <div className="back-btn my-3">
                    <button
                        className="btn btn-warning"
                        style={{
                            borderTopLeftRadius: "50px",
                            borderBottomLeftRadius: "50px",
                        }}
                    >
                        Back
                    </button>
                </div>
                {active === "basic" && (
                    <div className="register-form">
                        <form className="form">
                            <legend>Basic</legend>

                            <div className="form-group">
                                <label>Team Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name your team"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
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
                                            {logo ? (
                                                <p>{logo.name}</p>
                                            ) : (
                                                "Choose file"
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="btn btn-success"
                                style={{ width: "100%" }}
                                onClick={() => {
                                    if (name !== "" && logo["name"]) {
                                        setActive("captain");
                                    }
                                }}
                            >
                                Enter
                            </button>
                        </form>
                        <div className="hint">
                            <h1>Help text</h1>
                            <div>{parser(site.help_team_basic)}</div>
                        </div>
                    </div>
                )}
                {active === "captain" && (
                    <div className="register-form">
                        <form className="form">
                            <legend>Team Captain</legend>
                            <div className="form-group">
                                <label>Username</label>
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
                                    onChange={(e) =>
                                        setCaptainTag(e.target.value)
                                    }
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
                                    required
                                />
                            </div>

                            <button
                                type="button"
                                className="btn btn-success"
                                style={{ width: "100%" }}
                                onClick={() => {
                                    if (
                                        captain !== "" &&
                                        captainTag.match(regex.DISCORD_TAG) !==
                                            null &&
                                        captainProfile.match(
                                            regex.STEAM_PROFILE
                                        ) !== null
                                    ) {
                                        setActive("player");
                                    }
                                }}
                            >
                                Enter
                            </button>
                        </form>

                        <div className="hint">
                            <h1>Help text</h1>
                            <div>{parser(site.help_team_captain)}</div>
                        </div>
                    </div>
                )}

                {active === "player" && (
                    <div className="register-form">
                        <form
                            className="form"
                            // onSubmit={async (e) => {
                            //     e.preventDefault();
                            //     const validPlayers = players.filter((p, i) =>
                            //         i === 4
                            //             ? p.url.length > 0 &&
                            //               p.username.length > 0
                            //             : true
                            //     );
                            //     const imgBase64 = await imgToBase64(logo);
                            //     const teamId = await registerTeam(
                            //         profile.profile.user,
                            //         name,
                            //         imgBase64,
                            //         {
                            //             username: captain,
                            //             url: captainProfile,
                            //         },
                            //         captainTag,
                            //         game.id,
                            //         validPlayers
                            //     );
                            // }}
                        >
                            <legend>Players</legend>
                            {[...Array(5).keys()].map((i) => (
                                <>
                                    {console.log(i)}
                                    <PlayerFields
                                        key={i}
                                        number={i + 1}
                                        isAlternate={i === 4}
                                        player={players[i]}
                                        updatePlayer={(p) => {
                                            setPlayers([
                                                ...players.filter(
                                                    (pl, indx) => indx !== i
                                                ),
                                                p,
                                            ]);
                                        }}
                                        disabled={isDisabled}
                                    />
                                </>
                            ))}
                            <button
                                type="submit"
                                className="btn btn-success"
                                style={{ width: "100%" }}
                            >
                                Submit
                            </button>
                        </form>
                        <div className="hint">
                            <h1>Help Text</h1>
                            <div>{parser(site.help_team_players)}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateTeam;

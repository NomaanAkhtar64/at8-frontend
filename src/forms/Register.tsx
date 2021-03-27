import React, { useState } from "react";
import { Link } from "react-router-dom";

interface RegisterProps {
    toPayment: () => void;
}

const Register: React.FC<RegisterProps> = ({ toPayment }) => {
    const [basicState, setBasicState] = useState("active");
    const [captainState, setCaptainState] = useState("");
    const [playerState, setPlayerState] = useState("");
    const [name, setName] = useState("");
    const [logo, setLogo] = useState({});
    const [captain, setCaptain] = useState("");
    const [captainTag, setCaptainTag] = useState("");
    const [captainProfile, setCaptainProfile] = useState("");
    const [players, setPlayers] = useState([]);

    return (
        <>
            <div>
                <div className="register">
                    {basicState === "active" && (
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
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
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
                                                    setLogo(e.target.files[0]);
                                                }}
                                            />
                                            <label className="custom-file-label">
                                                {logo["name"] ? (
                                                    <p>{logo["name"]}</p>
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
                                            setBasicState("");
                                            setCaptainState("active");
                                        }
                                    }}
                                >
                                    Enter
                                </button>
                            </form>
                            <div className="hint">
                                <h1>Help text</h1>
                                <p>
                                    Enter your Team Name and your Team Logo and
                                    click on 'Enter' to proceed.
                                    <br />
                                    [Your Team Name must be as good as it can be
                                    told publically]
                                </p>
                            </div>
                        </div>
                    )}
                    {captainState === "active" && (
                        <div className="register-form">
                            <form className="form">
                                <legend>Team Captain</legend>
                                <div className="form-group">
                                    <label>Team Captain</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        value={captain}
                                        onChange={(e) =>
                                            setCaptain(e.target.value)
                                        }
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
                                            captainTag.match(
                                                /([a-zA-Z0-9!@#$%-_])+[#]\d{4}/gm
                                            ) !== null &&
                                            captainProfile !== ""
                                        ) {
                                            setCaptainState("");
                                            setPlayerState("active");
                                        }
                                    }}
                                >
                                    Enter
                                </button>
                            </form>

                            <div className="hint">
                                <h1>Help text</h1>
                                <p>
                                    Enter your Team Captain's Username on AT8
                                    site, discord username with tag (e.g.
                                    name#1234) and steam profile URL if you
                                    don't know where to see your steam profile
                                    url then visit <Link to="/faq/">Here.</Link>{" "}
                                    <br />
                                    <br /> After adding all the info click on
                                    'Enter' to proceed to the Players section.
                                </p>
                            </div>
                        </div>
                    )}

                    {playerState === "active" && (
                        <div className="register-form">
                            <form
                                className="form"
                                onSubmit={() => {
                                    toPayment();
                                }}
                            >
                                <legend>Players</legend>
                                <div className="form-group">
                                    <label>
                                        <strong>Player 1</strong>
                                    </label>

                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            required
                                            // value={players}
                                            onChange={(e) => {
                                                setPlayers([
                                                    ...players,
                                                    e.target.value,
                                                ]);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Steam Profile Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Steam Profile Url"
                                            required
                                            // value={players}
                                            onChange={(e) => {
                                                setPlayers([
                                                    ...players,
                                                    e.target.value,
                                                ]);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <strong>Player 2</strong>
                                    </label>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Steam Profile Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Steam Profile Url"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <strong>Player 3</strong>
                                    </label>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Steam Profile Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Steam Profile Url"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <strong>Player 4</strong>
                                    </label>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Steam Profile Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Steam Profile Url"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <strong>Player 5</strong>
                                    </label>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Steam Profile Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Steam Profile Url"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <strong>Alternate Player</strong>
                                    </label>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Steam Profile Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Steam Profile Url"
                                        />
                                    </div>
                                </div>
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
                                <p>
                                    Enter all the usernames and Steam Profile
                                    Urls of all the 5 players of your team and
                                    also the Alternate player if you have one.
                                    <br />
                                    If you don't know where to see the profile
                                    URL then visit <Link to="/faq/">Here.</Link>
                                    <br />
                                    <br /> After adding all the information
                                    click on 'Submit' to proceed to the Payment
                                    tab.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Register;

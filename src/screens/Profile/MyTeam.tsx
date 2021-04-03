import React, { useState } from "react";
import useTeams from "../../hooks/useTeams";

import SteamDefault from "../../assets/SteamDefault.png";
import Loading from "../../components/Loading";
import { useHistory } from "react-router";

interface MyTeamProps {
    profile: UserProfile;
    user: User;
}

const MyTeam: React.FC<MyTeamProps> = ({ profile, user }) => {
    const [editTeam, setEditTeam] = useState(false);
    const [createTeam, setCreateTeam] = useState(false);
    const teams = useTeams(profile.user);
    const history = useHistory();
    if (teams.hasLoaded)
        return (
            <div className="team">
                {teams.state.map((team, i) => (
                    <div
                        key={i}
                        className={i > 0 ? "team-data mt-5" : "team-data"}
                    >
                        <div className="team-name">
                            <h4>{team.name}</h4>
                            <img src={team.logo} width="100%" alt="Team-Logo" />
                            <p color="white">{team.registration_date}</p>
                        </div>
                        <div className="team-players">
                            <a
                                href={team.captain.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="player">
                                    <h4>{team.captain.username}</h4>
                                    <img
                                        src={
                                            team.captain.profile
                                                ? team.captain.profile
                                                : SteamDefault
                                        }
                                        className="captain-image"
                                        alt="Default"
                                    />
                                    <p color="white">Captain</p>
                                </div>
                            </a>

                            {team.players.map((player, i) => (
                                <a
                                    key={i}
                                    href={player.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <div className="player">
                                        <h4>{player.username}</h4>
                                        <img
                                            src={
                                                player.profile
                                                    ? player.profile
                                                    : SteamDefault
                                            }
                                            alt="Default"
                                            className={
                                                player.username ===
                                                user.username
                                                    ? "me"
                                                    : ""
                                            }
                                        />
                                        <p color="white">Player</p>
                                    </div>
                                </a>
                            ))}
                            <div className="edit-team-btn">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        setEditTeam(true);
                                        history.push(`/register/team/edit/${team.id}`);
                                    }}
                                >
                                    Edit Team
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {createTeam ? (
                    <div className="create-team"></div>
                ) : (
                    <div className="create-team-btn text-center my-3">
                        <button
                            type="button"
                            className="btn btn-success btn-lg"
                            onClick={() => setCreateTeam(true)}
                        >
                            Create your Team
                        </button>
                    </div>
                )}

                {(teams.state.length === 0 || !teams.state) && (
                    <div className="no-team">No Teams Found</div>
                )}
            </div>
        );
    return <Loading />;
};

export default MyTeam;

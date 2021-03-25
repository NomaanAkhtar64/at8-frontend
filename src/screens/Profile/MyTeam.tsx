import React, { useState } from "react";
import useTeams from "../../hooks/useTeams";

import SteamDefault from "../../assets/SteamDefault.png";
import useProfile from "../../hooks/useProfile";
import Loading from "../../components/Loading";

interface MyTeamProps {}

const MyTeam: React.FC<MyTeamProps> = () => {
    const teams = useTeams();
    const profile = useProfile();
    console.log(teams);
    if (profile.hasLoaded) {
        return (
            <div className="team">
                {teams.state.length !== 0 ? (
                    <>
                        {teams.state.map((team, i) => (
                            <div
                                key={i}
                                className={
                                    i > 0 ? " team-data mt-5" : "team-data"
                                }
                            >
                                <div className="team-name">
                                    <h4>{team.name}</h4>
                                    <img
                                        src={team.logo}
                                        width="100%"
                                        alt="Team-Logo"
                                    />
                                    <p color="white">
                                        {team.registration_date}
                                    </p>
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
                                                        profile.state.username
                                                            ? "me"
                                                            : ""
                                                    }
                                                />
                                                <p color="white">Player</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        );
    }
    return <Loading />;
};

export default MyTeam;

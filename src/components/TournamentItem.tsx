import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import useTournaments from "../hooks/useTournaments";
import Loading from "./Loading";
import "./TournamentItem.scss";

interface TournamentItemProps {}
const TournamentItem: React.FC<TournamentItemProps> = () => {
    const tournaments = useTournaments();
    const date = new Date(new Date().getTime());
    const today = Date.parse(date.toString());
    console.log(tournaments);

    return (
        // <div className='p-2 col-lg-6 col-12 tour-item-wrapper'>
        //   <div className='tour-item '>
        //     <div className='row'>
        //       <div className='col-12 col-md-8'>Left</div>
        //       <div className='col-12 col-md-4'>Right</div>
        //     </div>
        //   </div>
        // </div>
        <>
            {tournaments.hasLoaded ? (
                <div className="tourna-page">
                    <h1 className="text-white tournament-heading">Tournaments</h1>
                    {tournaments.state.map((tournament, i) => (
                        <div key={i} className="tourna">
                            <div className="left-side">
                                <h3
                                    className="tourna-name"
                                    style={{ textAlign: "center" }}
                                >
                                    {tournament.name}
                                </h3>
                                <hr color="black" />

                                {parse(`<p>${tournament.details}</p>`)}
                                <h4 className="slots">
                                    Slots Available:{" "}
                                    {tournament.slots - tournament.teams.length}
                                </h4>

                                <div className="time">
                                    <span>
                                        From:{" "}
                                        <p
                                            className="date"
                                            style={{ display: "inline" }}
                                        >
                                            {tournament.starting_time}
                                        </p>
                                    </span>
                                    <span>
                                        To:{" "}
                                        <p
                                            className="date"
                                            style={{ display: "inline" }}
                                        >
                                            {tournament.ending_time}
                                        </p>
                                    </span>
                                </div>
                            </div>

                            <div className="right-side">
                                {tournament.winner ? (
                                    <div className="winner">
                                        <h4>Winner</h4>
                                        <img
                                            src={tournament.winner.logo}
                                            alt="Logo"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <span
                                            className="prize-pool"
                                            style={{ textAlign: "center" }}
                                        >
                                            <h4>Prize Pool</h4>
                                            <h4>{tournament.prize}</h4>
                                        </span>

                                        <div className="register-btn">
                                            {today >=
                                                Date.parse(
                                                    tournament.starting_time
                                                ) &&
                                            today <
                                                Date.parse(
                                                    tournament.ending_time
                                                ) ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-lg"
                                                >
                                                    {tournament.slots -
                                                        tournament.teams
                                                            .length >
                                                    0 ? (
                                                        <Link
                                                            to="/register/"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                                color: "#fff",
                                                            }}
                                                        >
                                                            Register
                                                        </Link>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-lg"
                                                        >
                                                            Slots Are Full
                                                        </button>
                                                    )}
                                                </button>
                                            ) : (
                                                <span
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <h5>Registration Opens:</h5>
                                                    <p className="date">
                                                        {
                                                            tournament.starting_time
                                                        }
                                                    </p>
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default TournamentItem;

import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import "./TournamentItem.scss";
import Title from "./Title";
import useTournaments from "../hooks/tournaments";

interface TournamentItemProps extends RouteComponentProps<{ slug }> {}

const TournamentItem: React.FC<TournamentItemProps> = ({ match }) => {
  const tournaments = useTournaments().filter(
    (t) => t.name === match.params.slug
  );
  const date = new Date(new Date().getTime());
  const today = Date.parse(date.toString());

  return (
    <div className="detail-tournament">
      <div className="a1-body">
        {tournaments.map((tournament, i) => (
          <>
            <div className="tournament-body">
              <div key={i} className="tourna-top">
                <Title>{`${tournament.name} - AT8`}</Title>
                <h3 className="tourna-name">
                  {tournament.name} - {tournament.game.name}
                </h3>
                <div className="tourna-pic">
                  <img src={tournament.image} alt="" width="100%" />
                </div>
                <div className="tourna-body">{parse(tournament.details)}</div>
              </div>
              <div className="tourna-bottom">
                <div className="tourna-left">
                  {!tournament.winner && (
                    <div style={{ fontSize: "1.25rem" }}>
                      {tournament.fee !== 0 && (
                        <>
                          Fees: <span className="grey">{tournament.fee}</span>
                        </>
                      )}

                      <h5>
                        Slots Available:{" "}
                        <span className="grey">
                          {tournament.total_slots - tournament.occupied_slots}
                        </span>
                      </h5>
                    </div>
                  )}
                  <div className="tourna-time">
                    <h6>
                      From:
                      <span className="grey"> {tournament.starting_time}</span>
                    </h6>
                    <h6>
                      To:
                      <span className="grey"> {tournament.ending_time}</span>
                    </h6>
                  </div>
                </div>
                <div className="tourna-right">
                  {tournament.winner ? (
                    <div className="winner">
                      <img src={tournament.winner.logo} alt="" />
                      <div className="winner-body">
                        <h4>Winner</h4>
                        <h4 className="grey">{tournament.winner.name}</h4>
                      </div>
                    </div>
                  ) : (
                    <>
                      {tournament.prize && (
                        <h4 className="tourna-prize">
                          Prize Pool: <span>{tournament.prize}</span>
                        </h4>
                      )}

                      {today >= Date.parse(tournament.registration_date) &&
                      today < Date.parse(tournament.starting_time) ? (
                        <div className="register-btn">
                          {tournament.occupied_slots <
                          tournament.total_slots ? (
                            <Link
                              className="btn btn-danger btn-lg"
                              to={`/tournament/register/${tournament.slug}`}
                              style={{
                                textDecoration: "none",
                                color: "#fff",
                                display: "block",
                                backgroundColor: "#6d3343",
                              }}
                            >
                              Register
                            </Link>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-danger btn-lg"
                              disabled
                            >
                              Slots Are Full
                            </button>
                          )}
                        </div>
                      ) : (
                        <h6 className="tourna-registerdate">
                          Registration Open:
                          <span className="grey">
                            {" "}
                            {tournament.registration_date}
                          </span>
                        </h6>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <hr />
            {tournament.teams.length !== 0 ? (
              <>
                <h2 className="a1-heading">
                  Teams Registered in the Tournament
                </h2>
                <div className="tournament-teams">
                  {tournament.teams.map((team) => (
                    <div className="tournament-team-box">
                      <div className="tournament-team-name">{team.name}</div>
                      <div className="tournament-team-logo">
                        <img
                          src={team.logo}
                          alt=""
                          width="200px"
                          height="200px"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h3 className="a1-heading">No teams registered</h3>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default TournamentItem;

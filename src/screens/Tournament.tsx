import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import Title from "../components/Title";
import useTournaments from "../hooks/tournaments";
import "./Tournament.scss";
interface TournamentProps extends RouteComponentProps<{ slug }> {}

const Tournament: React.FC<TournamentProps> = ({ match }) => {
  const tournaments = useTournaments().filter(
    (t) => t.game.slug === match.params.slug
  );

  return (
    <div className="a1-wrapper">
      <Title>Tournaments - AT8</Title>
      <div className="a1-heading">Tournaments</div>
      {tournaments.length === 0 && (
        <h3 className="a1-body">No Tournaments Found</h3>
      )}
      <div className="tournament-list">
        {tournaments.map((tourna, i) => (
          <>
            <div
              className={`${i === 0 ? "first-tournament" : "tournament-box"}`}
            >
              <div className="tournament-image">
                <img src={tourna.image} alt="" width="300px" />
              </div>
              <div className="tournament-content">
                <div>
                  <h4 className="tournament-title">{tourna.name}</h4>
                </div>
                <div className="tournament-details">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    Slots: <span className="value">{tourna.total_slots}</span>
                  </div>
                  {tourna.prize && (
                    <div className="tournament-prize">
                      <span>
                        Fees: <span className="value">{tourna.fee}</span>
                      </span>
                      <span>
                        Prize: <span className="value">{tourna.prize}</span>
                      </span>
                    </div>
                  )}
                </div>
                <button className="view-details">
                  <Link
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      textAlign: "left",
                    }}
                    key={i}
                    to={`/tournament/detail/${tourna.name}`}
                  >
                    View Details
                  </Link>
                </button>
                {/* <div className="tournament-dates">
                  <span>Registration starting from</span>
                  <span>{tourna.registration_date}</span>
                </div> */}
              </div>
            </div>
            <hr />
            {/* <TournamentItem tournament={tourna} key={i} /> */}
          </>
        ))}
      </div>
    </div>
  );
};

export default Tournament;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import "./TournamentItem.scss";

interface TournamentItemProps {
  tournament: Tournament;
}

const TournamentItem: React.FC<TournamentItemProps> = ({ tournament }) => {
  const {
    name,
    occupied_slots,
    total_slots,
    details,
    starting_time,
    ending_time,
    winner,
    prize,
    registration_date,
    fee,
  } = tournament;
  const date = new Date(new Date().getTime());
  const today = Date.parse(date.toString());

  useEffect(() => {
    document.title = `${tournament.game.name} - AT8`;
  }, [tournament.game.name]);
  return (
    <div className="a1-body">
      <div className="tourna-top">
        <h3 className="tourna-name">
          {name} - {tournament.game.name}
        </h3>
        <div className="tourna-body">{parse(details)}</div>
      </div>
      <div className="tourna-bottom">
        <div className="tourna-left">
          {!winner && (
            <div style={{ fontSize: "1.25rem" }}>
              Fees: <span className="grey">{fee}</span>
              <h5>
                Slots Available:{" "}
                <span className="grey">{total_slots - occupied_slots}</span>
              </h5>
            </div>
          )}

          <div className="tourna-time">
            <h6>
              From:
              <span className="grey"> {starting_time}</span>
            </h6>
            <h6>
              To:
              <span className="grey"> {ending_time}</span>
            </h6>
          </div>
        </div>
        <div className="tourna-right">
          {winner ? (
            <div className="winner">
              <img src={winner.logo} alt="" />
              <div className="winner-body">
                <h4>Winner</h4>
                <h4 className="grey">{winner.name}</h4>
              </div>
            </div>
          ) : (
            <>
              <h4 className="tourna-prize">
                Prize Pool: <span>{prize}</span>
              </h4>

              {today >= Date.parse(registration_date) &&
              today < Date.parse(starting_time) ? (
                <div className="register-btn">
                  {occupied_slots < total_slots ? (
                    <Link
                      className="btn btn-danger btn-lg"
                      to={`/tournament/register/${tournament.slug}`}
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        display: "block",
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
                  <span className="grey"> {registration_date}</span>
                </h6>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentItem;

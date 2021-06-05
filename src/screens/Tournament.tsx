import React from "react";
import { RouteComponentProps } from "react-router";
import Title from "../components/Title";
import TournamentItem from "../components/TournamentItem";
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
      {tournaments.map((tourna, i) => (
        <TournamentItem tournament={tourna} key={i} />
      ))}
    </div>
  );
};

export default Tournament;

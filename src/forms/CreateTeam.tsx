import React, { useEffect, useState } from "react";
import useSite from "../hooks/useSite";
import "../screens/EnterTournament.scss";
import TeamCaptain from "./TeamCaptain";
import TeamBasic from "./TeamBasic";
import TeamPlayers from "./TeamPlayers";
import TeamGame from "./TeamGame";
import useTeams from "../hooks/teams";
import useUser from "../hooks/user";
import useGames from "../hooks/games";
import axios from "axios";

interface CreateTeamProps {
  onCancel: () => void;
  onSuccess: () => void;
}

type Active = "selector" | "basic" | "captain" | "player";
const CreateTeam: React.FC<CreateTeamProps> = ({ onCancel, onSuccess }) => {
  const [active, setActive] = useState<Active>("selector");
  const site = useSite();
  const user = useUser();
  const [isDisabled, setDisabled] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [team, setTeam] = useState<Team>({
    captain: {
      url: "",
      username: "",
      email: "",
      is_alternate: false,
      country: "",
      city: "",
    },
    logo: "",
    name: "",
    players: [],
    team_captains_discord_tag: "",
    user: user.state.profile.user,
    game: 0,
    country: "",
    city: "",
  });
  const games = useGames();
  const teams = useTeams();
  useEffect(() => {
    axios
      .get("https://extreme-ip-lookup.com/json/")
      .then((res) => {
        setCountry(res.data.country);
        setCity(res.data.city);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="create-team-form" style={{ width: "100%" }}>
      <div className="register">
        {active === "selector" && (
          <TeamGame
            games={games}
            onSuccess={({ gameId }) => {
              setTeam({ ...team, game: gameId });
              setActive("basic");
            }}
          />
        )}
        {active === "basic" && (
          <TeamBasic
            game={games.find((g) => g.id === team.game)}
            site={site}
            onBack={() => {
              setActive("selector");
            }}
            onSuccess={({ logo, name }) => {
              setTeam({ ...team, logo, name });
              setActive("captain");
            }}
          />
        )}
        {active === "captain" && (
          <TeamCaptain
            site={site}
            game={games.find((g) => g.id === team.game)}
            onBack={() => setActive("basic")}
            onSuccess={({ captain, captainTag }) => {
              setTeam({
                ...team,
                captain,
                team_captains_discord_tag: captainTag,
              });
              setActive("player");
            }}
          />
        )}

        {active === "player" && (
          <TeamPlayers
            game={games.find((g) => g.id === team.game)}
            site={site}
            disabled={isDisabled}
            onBack={() => setActive("captain")}
            onSuccess={async (p: Player[]) => {
              setDisabled(true);
              // console.log(country, city)
              const createdTeam = await teams.action.create({
                ...team,
                players: p,
                country: country,
                city: city,
              });
              setDisabled(false);
              if (createdTeam) {
                onSuccess();
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CreateTeam;

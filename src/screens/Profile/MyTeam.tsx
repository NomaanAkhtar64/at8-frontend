import React, { useEffect, useState } from "react";
import useTeams from "../../hooks/useTeams";

import SteamDefault from "../../assets/SteamDefault.png";
import Loading from "../../components/Loading";
import EditTeam from "../../forms/EditTeam";
import CreateTeam from "../../forms/CreateTeam";
import deleteTeam from "../../hooks/deleteTeam";

interface MyTeamProps {
  profile: UserProfile;
  user: User;
}
type Active = "teams" | "edit" | "create";
interface TeamProfileProps {
  t: Teams[];
  profile: UserProfile;
  user: User;
}
const TeamProfile: React.FC<TeamProfileProps> = ({ t, user, profile }) => {
  const [teams, setTeams] = useState(t);
  const [active, setActive] = useState<Active>("teams");
  const [teamToEdit, setTeamToEdit] = useState<number>(null);

  useEffect(() => {
    localStorage.setItem("team-list", JSON.stringify(teams));
    document.title = "My Teams - AT8";
  }, [teams]);

  switch (active) {
    case "teams":
      return (
        <div className="team">
          {teams.map((team, i) => (
            <div key={i} className={i > 0 ? "team-data mt-5" : "team-data"}>
              <div className="team-name">
                <h4>{team.name}</h4>
                <img src={team.logo} width="100%" alt="Team-Logo" />
                <p color="white">{team.registration_date}</p>
              </div>
              <div className="team-players">
                <a href={team.captain.url} target="_blank" rel="noreferrer">
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

                {team.players.map(
                  (player, i) =>
                    player.username &&
                    player.url && (
                      <a
                        key={i}
                        href={player.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="player">
                          <h4>{player.username}</h4>
                          <img
                            src={player.profile ? player.profile : SteamDefault}
                            alt="Default"
                            className={
                              player.username === user.username ? "me" : ""
                            }
                          />
                          <p color="white">Player</p>
                        </div>
                      </a>
                    )
                )}
                <div className="edit-team-btn">
                  <div
                    className="team-action-text"
                    onClick={() => {
                      setTeamToEdit(team.id);
                      setActive("edit");
                    }}
                  >
                    Edit
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(teams.length === 0 || !teams) && (
            <div className="no-team">No Teams Found</div>
          )}
          <div className="create-team-btn text-center my-3">
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={() => setActive("create")}
            >
              Create your Team
            </button>
          </div>
        </div>
      );
    case "create":
      return (
        <CreateTeam
          onCancel={() => setActive("teams")}
          onSuccess={(t) => {
            setActive("teams");
            setTeams([...teams, t]);
          }}
        />
      );
    case "edit":
      return (
        <EditTeam
          onSucess={(t) => {
            setTeams([...teams.filter((tm) => tm.id !== t.id), { ...t }]);
            setActive("teams");
          }}
          onCancel={() => setActive("teams")}
          onDelete={async (id) => {
            await deleteTeam(id);
            setTeams([...teams.filter((t) => t.id !== id)]);
            setActive("teams");
          }}
          userId={profile.user}
          teamId={teamToEdit}
        />
      );
  }
};
const MyTeam: React.FC<MyTeamProps> = ({ profile, user }) => {
  const teams = useTeams(profile.user);
  if (teams.hasLoaded && teams.state) {
    return <TeamProfile t={teams.state} user={user} profile={profile} />;
  }
  return <Loading />;
};

export default MyTeam;

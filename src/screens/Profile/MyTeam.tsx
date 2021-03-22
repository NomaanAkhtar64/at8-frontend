import React from "react";
import useTeams from "../../hooks/useTeams";

interface MyTeamProps {}

const MyTeam: React.FC<MyTeamProps> = () => {
    const teams = useTeams();

    console.log(teams);
    return (
        <div className="team">
            <div className="team-data"></div>
            
            
            <div className="team-register">

            </div>
        </div>
    );
};

export default MyTeam;

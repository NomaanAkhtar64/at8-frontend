import axios from "axios";
import { __API_URL__ } from "../const";

export default function registerTeam(
    user: number,
    name: string,
    logo: string | any,
    captain: Player,
    team_captains_discord_tag: string,
    game: number,
    player: Player[]
) {
    const token = `Token ` + localStorage.getItem("token");
    const headers = {
        Authorization: token,
        "Content-Type": "multipart/form-data",
    };
    return axios
        .post<Teams>(
            `${__API_URL__}/api/teams/`,
            {
                user,
                name,
                logo,
                captain,
                team_captains_discord_tag,
                game,
                player,
            },
            {
                headers,
            }
        )
        .then((res) => {
            console.log(res.data);
            return res.data.id;
        })
        .catch((err) => console.log(err));
}

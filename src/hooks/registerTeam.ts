import axios from 'axios'
import { __API_URL__ } from '../const'

export default function registerTeam(
  user: number,
  name: string,
  logo: string,
  captain: Player,
  team_captains_discord_tag: string,
  game: number,
  players: Player[]
) {
  const token = `Token ` + localStorage.getItem('token')
  const headers = {
    Authorization: token,
  }
  return axios
    .post<Team>(
      `${__API_URL__}/api/teams/`,
      {
        user,
        name,
        logo,
        captain,
        team_captains_discord_tag,
        game,
        players,
      },
      {
        headers,
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

import axios from 'axios'
import { __API_URL__ } from '../const'

export default function registerTeam(team: Team) {
  const token = `Token ` + localStorage.getItem('token')
  const headers = {
    Authorization: token,
  }
  return axios
    .post<Team>(`${__API_URL__}/api/teams/`, team, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

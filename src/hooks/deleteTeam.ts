import axios from 'axios'
import { __API_URL__ } from '../const'

export default function deleteTeam(id: number) {
  return axios
    .delete(`${__API_URL__}/api/teams/${id}/`)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => console.log(err))
}

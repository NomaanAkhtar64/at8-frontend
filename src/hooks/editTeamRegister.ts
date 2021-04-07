import axios from 'axios'
import { __API_URL__ } from '../const'

export default async function editTeamRegister(values: Partial<Teams>) {
  return axios
    .patch(`${__API_URL__}/api/teams/${values.id}/`, values)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
      console.error(err)
    })
}

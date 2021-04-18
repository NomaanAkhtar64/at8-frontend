import axios, { AxiosResponse } from 'axios'
import { __API_URL__ } from '../const'

export default async function editTeamRegister(values: Partial<Team>) {
  return axios
    .patch(`${__API_URL__}/api/teams/${values.id}/`, values)
    .then((res: AxiosResponse<Team>) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
      console.error(err)
    })
}

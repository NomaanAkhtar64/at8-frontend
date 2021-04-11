import axios from 'axios'
import { __API_URL__ } from '../const'
import getHeaders from './getHeaders'

export default function editUser(values: Partial<User>) {
  const headers = getHeaders()
  return axios
    .put(`${__API_URL__}/rest-auth/user/`, values, {
      headers,
    })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err)
    })
}

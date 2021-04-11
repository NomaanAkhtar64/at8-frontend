import axios from 'axios'
import { __API_URL__ } from '../const'
import getHeaders from './getHeaders'

export default function editProfile(values: Partial<UserProfile>) {
  const headers = getHeaders()
  return axios
    .put(`${__API_URL__}/api/edit-profile/`, values, {
      headers: {
        ...headers,
      },
    })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err)
    })
}

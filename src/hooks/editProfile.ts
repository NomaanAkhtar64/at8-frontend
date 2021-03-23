import axios from 'axios'
import { __API_URL__ } from '../const'
import getHeaders from './getHeaders'

export default function editProfile(values: Partial<UserProfile>) {
  const headers = getHeaders()
  axios
    .put(`${__API_URL__}/api/userprofile/`, values, {
      headers,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

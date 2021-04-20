import axios from 'axios'
import { __API_URL__ } from '../const'
import getHeaders from './useHeaders'

export default function changePassword(password: string, passwordRe: string) {
  const headers = getHeaders()

  axios
    .post(
      `${__API_URL__}/rest-auth/password/change/`,
      {
        new_password1: password,
        new_password2: passwordRe,
      },
      {
        headers,
      }
    )
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

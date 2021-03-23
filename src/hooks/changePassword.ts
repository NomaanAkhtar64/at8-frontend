import axios from 'axios'
import getHeaders from './getHeaders'

export default function changePassword(password: string, passwordRe: string) {
  const headers = getHeaders()

  axios
    .post(
      'https://at8-backend.herokuapp.com/rest-auth/password/change/',
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

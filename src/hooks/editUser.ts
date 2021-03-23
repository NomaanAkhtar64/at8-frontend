import axios from 'axios'
import getHeaders from './getHeaders'

export default async function editUser(values: Partial<User>) {
  const headers = getHeaders()
  axios
    .put('https://at8-backend.herokuapp.com/rest-auth/user/', values, {
      headers,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

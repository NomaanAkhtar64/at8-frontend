import axios from 'axios'
import getHeaders from './getHeaders'

export default function editProfile(values: Partial<User>) {
  const headers = getHeaders()
  axios
    .put('https://at8-backend.herokuapp.com/api/userprofile/', values, {
      headers,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

import axios from 'axios'
import { __API_URL__ } from '../const'
import getHeaders from './getHeaders'

export default function createEntry(values: Entry) {
  const headers = getHeaders()
  return axios
    .post<Entry>(`${__API_URL__}/api/entry/`, values, { headers })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

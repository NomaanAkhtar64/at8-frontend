import axios from 'axios'
import { __API_URL__ } from '../const'
import getHeaders from './getHeaders'

export default function editEntry(values: { id: number } & Partial<Entry>) {
  const headers = getHeaders()
  return axios
    .put<Entry>(`${__API_URL__}/api/entry/${values.id}/`, values, { headers })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

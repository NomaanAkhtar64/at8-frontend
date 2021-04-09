import axios from 'axios'
import { useEffect, useState } from 'react'
import { __API_URL__ } from '../const'
import getHeaders from './getHeaders'

export const useEntry = (entry_id: string) => {
  const [state, setState] = useState<Entry>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const headers = getHeaders()
    axios
      .get(`${__API_URL__}/api/entry/?entry_id=${entry_id}`, { headers })
      .then((res) => {
        if (res.data.length === 1) {
          setState(res.data[0])
        } else {
          setState(null)
        }
        setHasLoaded(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [entry_id])
  return { state, hasLoaded }
}

export const editEntry = (id: number, data: Partial<Entry>) => {
  const headers = getHeaders()
  return axios
    .patch<Entry>(`${__API_URL__}/api/entry/${id}/`, data, { headers })
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

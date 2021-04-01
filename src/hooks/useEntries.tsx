import axios from 'axios'
import { useEffect, useState } from 'react'
import { __API_URL__ } from '../const'
import getHeaders from './getHeaders'

export default function useEntries() {
  const [state, setState] = useState<EntryDetail[]>([])
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setHasLoaded(false)
    var cancelHandler = axios.CancelToken.source()
    const headers = getHeaders()
    axios
      .get(`${__API_URL__}/api/entry/`, {
        cancelToken: cancelHandler.token,
        headers,
      })
      .then((res) => {
        setState(res.data)
        setHasLoaded(true)
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
    return () => {
      cancelHandler.cancel()
    }
  }, [])
  return { state, error, hasLoaded }
}

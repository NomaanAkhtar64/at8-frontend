import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useTeams() {
  const [state, setState] = useState<Teams[]>([])
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()

    setHasLoaded(false)
    axios
      .get('https://at8-backend.herokuapp.com/api/teams/', {
        cancelToken: cancelHandler.token,
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

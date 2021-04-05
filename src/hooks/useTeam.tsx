import axios from 'axios'
import { useEffect, useState } from 'react'
import { __API_URL__ } from '../const'

export default function useTeam(user: number = null, id: number = null) {
  const [state, setState] = useState<Teams>(null)
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()

    axios
      .get(`${__API_URL__}/api/teams/${id}`, {
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        setState(res.data)
        setHasLoaded(true)
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('TEAMS REQUEST CANCELLED')
        } else {
          console.log(err)
          setError(err)
        }
      })

    return () => {
      cancelHandler.cancel()
    }
  }, [user, id])

  return { state, error, hasLoaded }
}

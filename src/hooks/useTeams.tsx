import axios from 'axios'
import { useEffect, useState } from 'react'
import { __API_URL__ } from '../const'

export default function useTeams(user: number = null) {
  const teamStorage = localStorage.getItem('team-list')
  const [state, setState] = useState<Teams[]>(
    teamStorage ? JSON.parse(teamStorage) : []
  )
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(teamStorage ? true : false)

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()

    axios
      .get(`${__API_URL__}/api/teams/${user === null ? '' : '?user=' + user}`, {
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        setState(res.data)
        localStorage.setItem('team-list', JSON.stringify(res.data))
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
  }, [user])

  return { state, error, hasLoaded }
}

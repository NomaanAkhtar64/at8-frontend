import axios from 'axios'
import { useEffect, useState } from 'react'
import { __API_URL__ } from '../const'

export default function useAnnouncements(id = null) {
  const [state, setState] = useState<Announcement[]>([])
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setHasLoaded(false)
    var cancelHandler = axios.CancelToken.source()

    axios
      .get(
        `${__API_URL__}/api/announcements/${
          id !== null ? id : ''
        }`,
        { cancelToken: cancelHandler.token }
      )
      .then((res) => {
        console.log(res.data)
        if (id !== null) {
          setState([res.data])
        } else {
          setState(res.data)
        }
        setHasLoaded(true)
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })

    return () => {
      cancelHandler.cancel()
    }
  }, [id])
  return { state, error, hasLoaded }
}

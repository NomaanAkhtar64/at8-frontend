import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useAnnouncements(id = null) {
  const [state, setState] = useState<Announcement[]>([])
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setHasLoaded(false)
    axios
      .get(
        `https://at8-backend.herokuapp.com/api/announcements/${
          id !== null ? id : ''
        }`
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
  }, [id])
  return { state, error, hasLoaded }
}

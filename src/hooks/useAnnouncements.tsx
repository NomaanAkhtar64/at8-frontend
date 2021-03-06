import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { __API_URL__ } from '../const'

export default function useAnnouncements(id = null) {
  const cachedAnnouncement = useMemo(
    () => !id && localStorage.getItem('announcements'),
    [id]
  )
  const [state, setState] = useState<Announcement[]>(
    cachedAnnouncement ? JSON.parse(cachedAnnouncement) : []
  )
  const [hasLoaded, setHasLoaded] = useState(cachedAnnouncement ? true : false)

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()

    axios
      .get(`${__API_URL__}/api/announcements/${id !== null ? id : ''}`, {
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        if (id !== null) {
          setState([res.data])
        } else {
          localStorage.setItem('announcements', JSON.stringify(res.data))
          setState(res.data)
        }
        setHasLoaded(true)
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.log(err)
        }
      })

    return () => {
      cancelHandler.cancel()
    }
  }, [id])
  return { state, hasLoaded }
}

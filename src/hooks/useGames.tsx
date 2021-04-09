import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { __API_URL__ } from '../const'

export default function useGames(slug = null) {
  const cachedGames = useMemo(() => localStorage.getItem('games'), [])

  const [state, setState] = useState<Games[]>(
    cachedGames ? JSON.parse(cachedGames) : []
  )
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(cachedGames ? true : false)

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()

    axios
      .get(`${__API_URL__}/api/games/${slug == null ? '' : slug}`, {
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        setState(res.data)
        localStorage.setItem('games', JSON.stringify(res.data))
        setHasLoaded(true)
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
    return () => {
      cancelHandler.cancel()
    }
  }, [slug])
  return { state, error, hasLoaded }
}

import axios from 'axios'
import { useEffect, useState } from 'react'
import { __API_URL__ } from '../const'

export default function useTournaments(slug: string = null) {
  const [state, setState] = useState<Tournament[]>([])
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setHasLoaded(false)
    var cancelHandler = axios.CancelToken.source()

    axios
      .get(
        `${__API_URL__}/api/tournaments/${
          slug === null ? '' : '?slug=' + slug
        }`,
        {
          cancelToken: cancelHandler.token,
        }
      )
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
  }, [slug])
  return { state, error, hasLoaded }
}

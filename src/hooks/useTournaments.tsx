import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { __API_URL__ } from '../const'

export default function useTournaments(
  slug: string = null,
  gameSlug: string = null
) {
  const cachedTournaments = useMemo(
    () =>
      gameSlug
        ? localStorage.getItem(`tournaments-${gameSlug}`)
        : slug
        ? localStorage.getItem(`tournaments-${slug}`)
        : localStorage.getItem('tournaments'),
    [slug, gameSlug]
  )

  const [state, setState] = useState<Tournament[]>(
    cachedTournaments ? JSON.parse(cachedTournaments) : []
  )
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(cachedTournaments ? true : false)

  useEffect(() => {
    const url = `${__API_URL__}/api/tournaments/?${slug ? 'slug=' + slug : ''}${
      gameSlug ? 'gameslug=' + gameSlug : ''
    }`
    var cancelHandler = axios.CancelToken.source()
    axios
      .get(url, { cancelToken: cancelHandler.token })
      .then((res) => {
        setState(res.data)
        if (gameSlug) {
          localStorage.setItem(
            `tournaments-${gameSlug}`,
            JSON.stringify(res.data)
          )
        } else if (slug) {
          localStorage.setItem(`tournaments-${slug}`, JSON.stringify(res.data))
        } else {
          localStorage.setItem('tournaments', JSON.stringify(res.data))
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
  }, [slug, gameSlug])
  return { state, error, hasLoaded }
}

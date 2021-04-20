import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { __API_URL__ } from '../const'

const TournamentsContext = createContext<Tournament[]>([])

export const TournamentProvider: React.FC<{}> = ({ children }) => {
  const cachedTournaments = localStorage['tournaments']
  const [hasLoaded, setHasLoaded] = useState(
    cachedTournaments === undefined ? false : true
  )
  const [state, setState] = useState(
    cachedTournaments === undefined ? [] : JSON.parse(cachedTournaments)
  )

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()
    axios
      .get(`${__API_URL__}/api/tournaments`, {
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        setState(res.data)
        localStorage.setItem('tournaments', JSON.stringify(res.data))
        setHasLoaded(true)
      })
      .catch((err) => {
        console.log(err)
      })

    return () => {
      cancelHandler.cancel()
    }
  }, [])

  if (hasLoaded)
    return (
      <TournamentsContext.Provider value={state}>
        {children}
      </TournamentsContext.Provider>
    )
  return <Loading />
}

const useTournaments = () => useContext(TournamentsContext)
export default useTournaments

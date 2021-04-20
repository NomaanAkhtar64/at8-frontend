import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { __API_URL__ } from '../const'
import StrippedLayout from '../layout/StrippedLayout'

const GamesContext = createContext<Game[]>([])

export const GamesProvider: React.FC<{}> = ({ children }) => {
  const cachedGame = localStorage['games']
  const [state, setState] = useState(
    cachedGame === undefined ? [] : JSON.parse(cachedGame)
  )
  const [hasLoaded, setHasLoaded] = useState(
    cachedGame === undefined ? false : true
  )

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()
    axios
      .get(`${__API_URL__}/api/games/`, {
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        setState(res.data)
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
  }, [])

  if (hasLoaded)
    return (
      <GamesContext.Provider value={state}>{children}</GamesContext.Provider>
    )
  return (
    <StrippedLayout>
      <Loading />
    </StrippedLayout>
  )
}

const useGames = () => useContext(GamesContext)
export default useGames

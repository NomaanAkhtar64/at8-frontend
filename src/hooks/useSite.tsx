import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { __API_URL__ } from '../const'

const SiteContext = createContext<Site>(null)

export const SiteProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<Site>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setHasLoaded(false)
    axios
      .get(`${__API_URL__}/api/site/`)
      .then((res) => {
        setState(res.data[0])
        setHasLoaded(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <SiteContext.Provider value={state}>
      {hasLoaded ? children : <Loading />}
    </SiteContext.Provider>
  )
}

const useSite = () => useContext(SiteContext)

export default useSite

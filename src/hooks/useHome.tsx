import axios from 'axios'
import { useEffect, useState } from 'react'
import { __API_URL__ } from '../const'

export default function useHome() {
  const [state, setState] = useState<Home[]>()
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()
    axios
      .get(`${__API_URL__}/api/home/`, { cancelToken: cancelHandler.token })
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

  return { state, hasLoaded }
}
